import * as os from "node:os";
import type { Tool, ToolResult } from "../core/tool";

export interface NetworkAddress {
    address: string;
    family: string;
    internal: boolean;
    cidr: string | null;
}

export interface NetworkInterfaceInfo {
    name: string;
    addresses: NetworkAddress[];
}

export interface NetworkInfo {
    interfaces: NetworkInterfaceInfo[];
    externalInterfaces: NetworkInterfaceInfo[];
    count: number;
}

export function getNetworkInfo(): NetworkInfo {
    const interfaces: NetworkInterfaceInfo[] = Object.entries(os.networkInterfaces())
        .map(([name, addresses]) => ({
            name,
            addresses: (addresses ?? []).map(entry => ({
                address: entry.address,
                family: entry.family,
                internal: entry.internal,
                cidr: entry.cidr ?? null
            }))
        }));

    const externalInterfaces: NetworkInterfaceInfo[] = interfaces
        .map(entry => ({
            name: entry.name,
            addresses: entry.addresses.filter(address => !address.internal)
        }))
        .filter(entry => entry.addresses.length > 0);

    return { interfaces, externalInterfaces, count: interfaces.length };
}

export const networkInfoTool: Tool = {
    name: "network_info",
    aliases: ["rede", "informações de rede", "interfaces de rede"],
    description: "Obtém informações atuais sobre as interfaces de rede do computador.",
    risk: "safe",
    schema: {
        type: "function",
        function: {
            name: "network_info",
            description: "Obtém informações atuais sobre as interfaces de rede do computador.",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
    execute(): ToolResult {
        try {
            const info = getNetworkInfo();
            const lines = info.externalInterfaces.map(entry =>
                `${entry.name}\n${entry.addresses.map(address =>
                    `- ${address.family}: ${address.address}`
                ).join("\n")}`
            );

            return {
                output: "D.A.I.S.Y > Informações de Rede:\n\n" +
                    (lines.length > 0
                        ? lines.join("\n\n")
                        : "Nenhuma interface de rede com endereço não interno foi encontrada."),
                data: info
            };
        } catch {
            return {
                output: "D.A.I.S.Y > Não foi possível consultar as interfaces de rede. Tente novamente."
            };
        }
    }
};
