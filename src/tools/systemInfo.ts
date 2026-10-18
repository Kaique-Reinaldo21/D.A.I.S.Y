import * as os from "node:os";
import type { Tool, ToolResult } from "../core/tool";

export interface SystemInfo {
    system: string;
    release: string;
    architecture: string;
    hostname: string;
    platform: string;
    userInfo: os.UserInfo<string>;
    cpuSpeed: number;
    cpuModel: string;
    logicalCpuCount: number;
    uptime: number;
}

export function getSystemInfo(): SystemInfo {

    const cpus = os.cpus();

    return {
        system: os.type(),
        release: os.release(),
        architecture: os.arch(),
        hostname: os.hostname(),
        platform: os.platform(),

        userInfo: os.userInfo(),

        cpuSpeed: cpus[0]?.speed ?? 0,
        cpuModel: cpus[0]?.model ?? "Não identificado",
        logicalCpuCount: cpus.length,

        uptime: os.uptime()
    };
}
export const systemInfoTool: Tool = {
    name: "system_info",

    aliases: [
        "sistema",
        "system info",
        "informações do sistema"
    ],

    description:
        "Exibe informações sobre o sistema operacional e hardware.",

    risk: "safe",

    schema: {
        type: "function",

        function: {
            name: "system_info",

            description:
                "Obtém informações atuais sobre o sistema operacional e hardware do computador.",

            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    execute(): ToolResult {
        const info = getSystemInfo();
        return {
            output: `D.A.I.S.Y > Informações do Sistema:\n` +
                `Sistema: ${info.system}\n` +
                `Versão: ${info.release}\n` +
                `Arquitetura: ${info.architecture}\n` +
                `Hostname: ${info.hostname}\n` +
                `Plataforma: ${info.platform}\n` +
                `Usuário: ${info.userInfo.username}\n` +
                `Velocidade da CPU: ${info.cpuSpeed} MHz\n` +
                `Modelo da CPU: ${info.cpuModel}\n` +
                `Processadores lógicos da CPU: ${info.logicalCpuCount}\n` +
                `Tempo de Atividade (s): ${info.uptime.toFixed(0)} segundos\n`,
            data: info,
            shouldExit: false
        }
    }
};
