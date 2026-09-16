import {Tool} from '../core/tool';


export const greetingTool: Tool = {
    name: "greeting",
    aliases: ["hello", "hi", "oi", "olá", "bom dia daisy", "on", "acorda"],
    description: "Inicia uma interação com a D.A.I.S.Y.",
    execute() {
        return {
            output: `D.A.I.S.Y > Olá Mestre, como posso ajudá-lo hoje?`,
        };
    }
};
