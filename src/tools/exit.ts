import type { Tool } from "../core/tool";

export const exitTool: Tool = {
    name: "exit",

    aliases: [
        "sair",
        "quit",
        "fechar",
        "encerrar",
        "boa noite daisy"
    ],

    description: "Encerra a D.A.I.S.Y.",

    execute() {
        return {
            output: "D.A.I.S.Y > Encerrando a D.A.I.S.Y. Até logo!",
            shouldExit: true
        };
    }
};