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
import type {Tool} from '../core/tool';
export const systemInfoTool: Tool = {
    name: "system info",
    aliases: ["informações do sistema", "sistema"],
    description: "Exibe informações detalhadas sobre o sistema operacional, hardware e memória.",
    execute(): { output: string; shouldExit: boolean } {
        const info = getSystemInfo();
        return {
            output: `D.A.I.S.Y > Informações do Sistema:\n` +
                `Sistema: ${info.system}\n` +
                `Versão: ${info.release}\n` +
                `Arquitetura: ${info.architecture}\n` +
                `Hostname: ${info.hostname}\n` +
                `Plataforma: ${info.platform}\n` +
                `Usuário: ${info.userInfo.username}\n` +
                `Interfaces de Rede: ${JSON.stringify(info.networkInterfaces, null, 2)}\n` +
                `Velocidade da CPU: ${info.cpuSpeed} MHz\n` +
                `Modelo da CPU: ${info.cpuModel}\n` +
                `Núcleos da CPU: ${info.cpuCores}\n` +
                `Memória Total (GB): ${info.totalMemoryGB.toFixed(2)} GB\n` +
                `Memória Livre (GB): ${info.freeMemoryGB.toFixed(2)} GB\n` +
                `Tempo de Atividade (s): ${info.uptime.toFixed(0)} segundos\n`,
            shouldExit: false
        }
    }
};