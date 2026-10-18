import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { Tool, ToolResult } from "../core/tool";

const execFileAsync = promisify(execFile);
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export interface ProcessInfo {
    pid: number;
    name: string;
    cpuPercent: number;
    memoryPercent: number;
}

function normalizeLimit(value: unknown): number {
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
        return DEFAULT_LIMIT;
    }

    return Math.min(MAX_LIMIT, Math.max(1, Math.floor(value)));
}

export async function getProcessInfo(limit: unknown = DEFAULT_LIMIT): Promise<ProcessInfo[]> {
    const processLimit = normalizeLimit(limit);
    const { stdout } = await execFileAsync(
        "ps",
        ["-eo", "pid=,pcpu=,pmem=,comm=", "--sort=-pcpu"],
        {
            encoding: "utf8",
            env: { ...process.env, LC_ALL: "C" },
            timeout: 5000,
            maxBuffer: 4 * 1024 * 1024
        }
    );

    return stdout.trim().split("\n").filter(line => line.trim() !== "")
        .slice(0, processLimit)
        .map(line => {
            const match = line.trim().match(/^(\d+)\s+([\d.]+)\s+([\d.]+)\s+(.+)$/);
            if (!match) {
                throw new Error("Formato inesperado na resposta de ps.");
            }

            const pid = Number(match[1]);
            const cpuPercent = Number(match[2]);
            const memoryPercent = Number(match[3]);
            if (!Number.isSafeInteger(pid) || pid <= 0 ||
                !Number.isFinite(cpuPercent) || !Number.isFinite(memoryPercent)) {
                throw new Error("Valores inválidos na resposta de ps.");
            }

            return { pid, name: match[4], cpuPercent, memoryPercent };
        });
}

export const processInfoTool: Tool = {
    name: "process_info",
    aliases: ["processos", "processos em execução"],
    description: "Obtém informações sobre os processos em execução no computador.",
    risk: "safe",
    schema: {
        type: "function",
        function: {
            name: "process_info",
            description: "Obtém informações sobre os processos em execução no computador.",
            parameters: {
                type: "object",
                properties: {
                    limit: {
                        type: "number",
                        description: "Quantidade máxima de processos a retornar. Padrão: 10; máximo: 50."
                    }
                }
            }
        }
    },
    async execute(input): Promise<ToolResult> {
        const limit = typeof input === "object" && input !== null ? input.limit : undefined;

        try {
            const processes = await getProcessInfo(limit);
            const rows = processes.map(process =>
                `${process.pid} | ${process.name} | ${process.cpuPercent.toFixed(1)}% | ${process.memoryPercent.toFixed(1)}%`
            );

            return {
                output: processes.length > 0
                    ? `D.A.I.S.Y > Processos por uso de CPU:\nPID | Processo | CPU | RAM\n${rows.join("\n")}`
                    : "D.A.I.S.Y > Nenhum processo encontrado.",
                data: { processes, count: processes.length }
            };
        } catch {
            return {
                output: "D.A.I.S.Y > Não foi possível consultar os processos em execução. Tente novamente."
            };
        }
    }
};
