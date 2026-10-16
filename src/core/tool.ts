export interface ToolResult {
    output: string;
    shouldExit?: boolean;
    awaitInput?: boolean;
}

export interface ToolSchema {
    type : "function";
    function: {
        name: string;
        description: string;
        parameters?: {
            type: "object";
            properties: Record<string, any>;
            required?: string[];
        };
    };
}


export interface Tool {
    name: string;
    aliases: string[];
    description: string;
    schema?: ToolSchema;
    match?(input: string): boolean;

    execute(
        input?: string | Record<string, any>
    ): ToolResult | Promise<ToolResult>;
}