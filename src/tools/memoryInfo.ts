import * as os from "node:os";


export interface MemoryInfo {
    totalMemoryGB: number;
    freeMemoryGB: number;
    usedMemoryGB: number;
    memoryUsagePercentage: number;
}

export function getMemoryInfo(): MemoryInfo {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercentage = (usedMemory / totalMemory) * 100;

    return {
        totalMemoryGB: totalMemory / (1024 ** 3),
        freeMemoryGB: freeMemory / (1024 ** 3),
        usedMemoryGB: usedMemory / (1024 ** 3),
        memoryUsagePercentage
    };
}
import type {Tool} from '../core/tool';
export const memoryInfoTool: Tool = {
    name: "memory info",
    aliases: ["informações da memória", "memória", "ram"],
    description: "Exibe informações detalhadas sobre a memória do sistema.",
    execute(): { output: string; shouldExit: boolean } {
        const info = getMemoryInfo();
        return {
            output: `D.A.I.S.Y > Informações da Memória:\n` +
                `Memória Total (GB): ${info.totalMemoryGB.toFixed(2)}\n` +
                `Memória Livre (GB): ${info.freeMemoryGB.toFixed(2)}\n` +
                `Memória Usada (GB): ${info.usedMemoryGB.toFixed(2)}\n` +
                `Uso da RAM: ${info.memoryUsagePercentage.toFixed(2)}%`,
            shouldExit: false
        };
    }
};  