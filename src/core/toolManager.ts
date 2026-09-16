import type { Tool, toolResult } from './tool';

export class ToolManager {
    private tools = new Map<string, Tool>();

    register(tool: Tool): void {
        const commands = [tool.name, ...tool.aliases];
        for (const command of commands) {
            this.tools.set(this.normalize(command), tool);
        }
    }

   async execute(input: string): Promise<toolResult> {
        const command = this.normalize(input);
        const tool = this.tools.get(command);
        if (!tool) {
            return { output: `D.A.I.SY > Comando não encontrado senhor: ${input}`, shouldExit: false };
        }
        return await tool.execute();
    }
    list(): Tool[] {
        return [...new Set(this.tools.values())];
    }

    private normalize(command: string): string {
        return command.trim().toLowerCase();
    }
}