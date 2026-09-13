import * as os from "node:os";

export interface SystemInfo {
    system: string;
    release: string;
    architecture: string;
    hostname: string;
    platform: string;
    userInfo: os.UserInfo<string>;
    networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]>;
    cpuSpeed: number;
    cpuModel: string;
    cpuCores: number;
    totalMemoryGB: number;
    freeMemoryGB: number;
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
        networkInterfaces: os.networkInterfaces(),

        cpuSpeed: cpus[0]?.speed ?? 0,
        cpuModel: cpus[0]?.model ?? "Não identificado",
        cpuCores: cpus.length,

        totalMemoryGB: os.totalmem() / (1024 ** 3),
        freeMemoryGB: os.freemem() / (1024 ** 3),

        uptime: os.uptime()
    };
}