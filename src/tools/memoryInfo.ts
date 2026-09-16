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