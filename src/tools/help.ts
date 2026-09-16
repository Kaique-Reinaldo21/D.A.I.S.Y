import type { Tool } from "../core/tool";
import type { ToolManager } from "../core/toolManager";

export function createHelpTool(toolManager: ToolManager): Tool {

    return {
        name: "help",

        aliases: [
            "ajuda",
            "comandos",
            "commands",
            "help"
        ],

        description: "Exibe a lista de comandos disponíveis.",

        execute() {

            const tools = toolManager.list();

            const list = tools
                .map(tool =>
                    `- ${tool.name}: ${tool.description}`
                )
                .join("\n");

            return {
                output:
                    `D.A.I.S.Y > Lista de Comandos Disponíveis:\n\n${list}`
            };
        }
    };
}
