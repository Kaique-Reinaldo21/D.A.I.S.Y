import type { Tool, ToolResult } from "./tool";

export class ToolManager {

    private tools = new Map<string, Tool>();

    private pendingTool?: Tool;

    register(tool: Tool): void {

        const commands = [
            tool.name,
            ...tool.aliases
        ];

        for (const command of commands) {
            this.tools.set(
                this.normalize(command),
                tool
            );
        }
    }

    async execute(input: string): Promise<ToolResult | null> {

        const command = this.normalize(input);

        // Se alguma ferramenta estiver esperando
        // uma resposta do usuário
        if (this.pendingTool) {

            const tool = this.pendingTool;

            this.pendingTool = undefined;

            const result = await tool.execute(command);

            if (result.awaitInput) {
                this.pendingTool = tool;
            }

            return result;
        }

        // Primeiro tenta encontrar comando exato
        let tool = this.tools.get(command);

        // Se não encontrar, procura uma Tool
        // que reconheça a entrada pelo match()
        if (!tool) {
            tool = this.list().find(
                t => t.match?.(command)
            );
        }

        // Nenhuma Tool reconheceu
        // Devolve null para o index.ts mandar ao Ollama
        if (!tool) {
            return null;
        }

        const result = await tool.execute(command);

        if (result.awaitInput) {
            this.pendingTool = tool;
        }

        return result;
    }

    list(): Tool[] {
        return [...new Set(this.tools.values())];
    }

    private normalize(command: string): string {
        return command
            .trim()
            .toLowerCase();
    }
}