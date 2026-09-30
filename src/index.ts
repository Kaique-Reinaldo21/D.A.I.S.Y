import * as readline from "node:readline";

import { ToolManager } from "./core/toolManager";

import { systemInfoTool } from "./tools/systemInfo";
import { memoryInfoTool } from "./tools/memoryInfo";
import { greetingTool } from "./tools/greeting";
import { aboutTool } from "./tools/about";
import { exitTool } from "./tools/exit";
import { createHelpTool } from "./tools/help";
import { openApplicationTool } from "./tools/openApplication";

import { chatWithOllama } from "./ai/ollamaClient";


const assistantName: string = "D.A.I.S.Y.";

console.log(`\n${assistantName}`);
console.log("Dynamic Autonomous Intelligence System for You\n");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const toolManager = new ToolManager();


// Registra as ferramentas
toolManager.register(systemInfoTool);
toolManager.register(memoryInfoTool);
toolManager.register(greetingTool);
toolManager.register(aboutTool);
toolManager.register(exitTool);
toolManager.register(openApplicationTool);

// Help por último
toolManager.register(
    createHelpTool(toolManager)
);


function startAssistant(): void {

    rl.question("Você > ", async (message: string) => {

        try {

            // Primeiro procura alguma Tool
            const toolResult =
                await toolManager.execute(message);


            // Se alguma Tool reconheceu o comando
            if (toolResult) {

                console.log(toolResult.output);

                if (toolResult.shouldExit) {
                    rl.close();
                    return;
                }

                startAssistant();
                return;
            }


            // Se nenhuma Tool reconheceu,
            // envia a mensagem para o Ollama
            console.log("D.A.I.S.Y > Pensando...");

            const response =
                await chatWithOllama(message);

            console.log(
                `D.A.I.S.Y > ${response}\n`
            );


        } catch (error) {

            console.log(
                "D.A.I.S.Y > Não consegui acessar meu modelo local."
            );

            console.error(error);
        }


        startAssistant();
    });
}


startAssistant();