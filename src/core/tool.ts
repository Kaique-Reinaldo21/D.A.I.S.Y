export interface ToolResult {
    output: string;

    // Resultado bruto opcional da ferramenta.
    // Futuramente será enviado para a IA.
    data?: unknown;

    shouldExit?: boolean;
    awaitInput?: boolean;
}

export type ToolArguments = Record<string, unknown>;

export interface ToolParameter {
    type: "string" | "number" | "boolean" | "object" | "array";
    description?: string;
    enum?: string[];
}

export interface ToolSchema {
    type: "function";

    function: {
        name: string;
        description: string;

        parameters: {
            type: "object";
            properties: Record<string, ToolParameter>;
            required?: string[];
        };
    };
}

export type ToolRisk =
    | "safe"
    | "confirmation"
    | "critical";

export interface Tool {
    name: string;
    aliases: string[];
    description: string;

    schema?: ToolSchema;

    /*
     * Por enquanto é opcional para não quebrar
     * todas as Tools existentes de uma vez.
     */
    risk?: ToolRisk;

    match?(input: string): boolean;

    execute(
        input?: string | ToolArguments
    ): ToolResult | Promise<ToolResult>;
}