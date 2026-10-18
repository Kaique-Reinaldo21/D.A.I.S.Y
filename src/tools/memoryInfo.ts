import * as os from "node:os";
import type { Tool } from "../core/tool";

export interface MemoryInfo {
    totalGB: number;
    freeGB: number;
    usedGB: number;
    usedPercent: number;
}

export function getMemoryInfo(): MemoryInfo {
    const totalBytes = os.totalmem();
    const freeBytes = os.freemem();
    const usedBytes = totalBytes - freeBytes;
    const usedPercent = (usedBytes / totalBytes) * 100;

    return {
        totalGB: totalBytes / (1024 ** 3),
        freeGB: freeBytes / (1024 ** 3),
        usedGB: usedBytes / (1024 ** 3),
        usedPercent
    };
}

export const memoryInfoTool: Tool = {
    name: "memory_info",
    aliases: ["informações da memória", "memória", "ram"],
    description: "Obtém informações atuais sobre o uso de memória RAM do computador.",
    risk: "safe",
    schema: {
        type: "function",
        function: {
            name: "memory_info",
            description: "Obtém informações atuais sobre o uso de memória RAM do computador.",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    execute(): { output: string; data: MemoryInfo; shouldExit: boolean } {
        const info = getMemoryInfo();
        return {
            output: `D.A.I.S.Y > Informações da Memória:\n` +
                `Memória Total (GB): ${info.totalGB.toFixed(2)}\n` +
                `Memória Livre (GB): ${info.freeGB.toFixed(2)}\n` +
                `Memória Usada (GB): ${info.usedGB.toFixed(2)}\n` +
                `Uso da RAM: ${info.usedPercent.toFixed(2)}%`,
            data: info,
            shouldExit: false
        };
    }
};
