export interface toolResult {
    output: string;
    shouldExit?: boolean;
}

export interface Tool {
    name: string;
    aliases: string[];
    description: string;

    execute(): toolResult | Promise<toolResult>;
}