export interface OllamaMessage {
    role: "system" | "user" | "assistant" | "tool";
    content: string;
    tool_calls?: any[];
}

export interface OllamaResponse {
    message: OllamaMessage;
}

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "llama3.2:3b"; // Excelente modelo para tool calling!

const messages: OllamaMessage[] = [
    {
        role: "system",
        content: `Você é D.A.I.S.Y., uma assistente pessoal de inteligência artificial.
        Responda em português brasileiro. Seja natural e prestativa.
        Você TEM permissão para usar as ferramentas fornecidas para interagir com o computador do usuário (ex: checar sistema, abrir apps).
        Sempre use uma ferramenta se o usuário pedir algo que você não saiba por conta própria. Após usar a ferramenta, gere uma resposta amigável com os dados.`
    }
];

export async function chatWithOllama(
    userMessage: string | null, // Pode ser null se estivermos apenas devolvendo dados de uma ferramenta
    tools: any[] = [],
    toolResponses: OllamaMessage[] = []
): Promise<OllamaMessage> {

    if (userMessage) {
        messages.push({ role: "user", content: userMessage });
    }

    if (toolResponses.length > 0) {
        messages.push(...toolResponses);
    }

    const payload: any = {
        model: MODEL,
        messages,
        stream: false
    };

    if (tools.length > 0) {
        payload.tools = tools;
    }

    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Ollama respondeu com HTTP ${response.status}`);
    }

    const data = await response.json() as OllamaResponse;
    const assistantMessage = data.message;

    // Salva a resposta da IA no histórico
    messages.push(assistantMessage);

    return assistantMessage;
}