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

    async execute(input: string): Promise<ToolResult> {

        const command = this.normalize(input);

        if (this.pendingTool) {

            const tool = this.pendingTool;

            this.pendingTool = undefined;

            const result = await tool.execute(command);

            if (result.awaitInput) {
                this.pendingTool = tool;
            }

            return result;
        }

        let tool = this.tools.get(command);

        if (!tool) {
            tool = this.list().find(
                t => t.match?.(command)
            );
        }

        if (!tool) {
            return {
                output:
                    `D.A.I.S.Y > Comando não encontrado senhor: ${input}`
            };
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