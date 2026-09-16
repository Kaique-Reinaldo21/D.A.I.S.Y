import type { Tool } from "../core/tool";

export const aboutTool: Tool = {
    name: "about",

    aliases: [
        "sobre",
        "info",
        "informações",
        "informacoes"
    ],

    description: "Exibe informações sobre a D.A.I.S.Y.",

    execute() {
        return {
            output:
                "D.A.I.S.Y > Eu sou a D.A.I.S.Y., " +
                "Dynamic Autonomous Intelligence System for You. " +
                "Personal AI • Automation • Voice • Memory."
        };
    }
};