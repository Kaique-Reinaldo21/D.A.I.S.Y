import * as readline from "node:readline";

import { ToolManager } from "./core/toolManager";

import { systemInfoTool } from "./tools/systemInfo";
import { memoryInfoTool } from "./tools/memoryInfo";
import { greetingTool } from "./tools/greeting";
import { aboutTool } from "./tools/about";
import { exitTool } from "./tools/exit";
import { createHelpTool } from "./tools/help";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const toolManager = new ToolManager();

toolManager.register(systemInfoTool);
toolManager.register(memoryInfoTool);
toolManager.register(greetingTool);
toolManager.register(aboutTool);
toolManager.register(exitTool);
toolManager.register(createHelpTool(toolManager));

console.log("\nD.A.I.S.Y.");
console.log("Dynamic Autonomous Intelligence System for You\n");

function startAssistant(): void {

    rl.question("Você > ", async (message: string) => {

        const result = await toolManager.execute(message);

        console.log(result.output);

        if (result.shouldExit) {
            rl.close();
            return;
        }

        startAssistant();
    });
}

startAssistant();