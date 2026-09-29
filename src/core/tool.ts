export interface ToolResult {
    output: string;
    shouldExit?: boolean;
    awaitInput?: boolean;
}

export interface Tool {
    name: string;
    aliases: string[];
    description: string;

    match?(input: string): boolean;

    execute(
        input?: string
    ): ToolResult | Promise<ToolResult>;
}