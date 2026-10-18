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

    // Apenas localiza; match() deve atuar como um predicado sem efeitos colaterais.
    resolve(input: string): Tool | undefined {

        const command = this.normalize(input);

        return this.tools.get(command) ?? this.list().find(
            tool => tool.match?.(command)
        );
    }

    getByName(name: string): Tool | undefined {

        const normalizedName = this.normalize(name);

        return this.list().find(tool =>
            this.normalize(tool.name) === normalizedName ||
            (tool.schema !== undefined &&
                this.normalize(tool.schema.function.name) === normalizedName)
        );
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

        const tool = this.resolve(command);

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
