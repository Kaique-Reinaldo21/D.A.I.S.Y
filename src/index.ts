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
import { runRouterAgent } from "./ai/agents/routerAgent";

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


// ... (imports e inicialização do readline e ToolManager mantidos iguais)

function startAssistant(): void {
    rl.question("Você > ", async (message: string) => {
        try {
            // 1. Opcional: Manter o ToolManager para comandos rígidos instantâneos (como "sair")
            const localResult = await toolManager.execute(message);
            if (localResult) {
                // Se for um comando de sistema crítico rápido ("sair", "help")
                if (localResult.shouldExit) {
                    console.log(localResult.output);
                    rl.close();
                    return;
                }
                // Como queremos que a IA tome controle de quase tudo, você pode 
                // comentar a lógica local para ferramentas regulares se preferir, 
                // mas vamos manter para comandos nativos do terminal por enquanto.
                if (message === "sair" || message === "ajuda" || message === "help"){
                     console.log(localResult.output);
                     startAssistant();
                     return;
                }
            }
            // 2. Prepara as ferramentas que possuem schema para enviar à IA
            const aiTools = toolManager.list()
                .filter(t => t.schema)
                .map(t => t.schema);

            console.log("D.A.I.S.Y > Pensando (Specifier)...");

           // 3. AGENTE 1: O ROTEADOR (Specifier) decide o que fazer
            const decision = await runRouterAgent(message, aiTools);
            
            // Console opcional apenas para ver o raciocínio do Roteador enquanto programa
            console.log(`[Raciocínio Interno: ${decision.reasoning}]`);

            // 4. BIFURCAÇÃO DA DECISÃO
            if (decision.action === "TOOL_CALL" && decision.toolName) {
                console.log(`[Sistema: executando a ferramenta '${decision.toolName}']`);
                
                const tool = toolManager.list().find(t => t.schema?.function.name === decision.toolName);
                
                if (tool) {
                    // Aqui entra o Agente Executor (Coder). 
                    // Por enquanto, chamamos a ferramenta diretamente, o que já executa o código
                    const result = await tool.execute(decision.parameters);
                    
                    // Prepara o resultado bruto para o Revisor/Chat
                    const toolResponseMessage = {
                        role: "tool" as const,
                        content: result.output
                    };

                    // AGENTE 3: O CHAT (QA) transforma o resultado numa resposta humana
                    console.log("D.A.I.S.Y > Avaliando os resultados (QA)...");
                    const finalResponse = await chatWithOllama(null, [], [toolResponseMessage]);
                    console.log(`D.A.I.S.Y > ${finalResponse.content}\n`);

                } else {
                    console.log("D.A.I.S.Y > Desculpe Mestre, o Roteador tentou usar uma ferramenta que não encontrei.\n");
                }

            } else {
                // Ação: Bate-papo normal
                console.log("D.A.I.S.Y > Formulando resposta...");
                const response = await chatWithOllama(message);
                console.log(`D.A.I.S.Y > ${response.content}\n`);
            }

        } catch (error) {
            console.log("D.A.I.S.Y > Não consegui aceder ao meu modelo local.");
            console.error(error);
        }

        startAssistant();
    });
}

startAssistant();