interface OllamaMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

interface OllamaResponse {
    message: {
        role: "assistant";
        content: string;
    };
}

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "llama3.2:3b";

const messages: OllamaMessage[] = [
    {
    role: "system",
    content: `
Você é D.A.I.S.Y., sigla para Dynamic Autonomous Intelligence System for You.

Você é uma assistente pessoal de inteligência artificial.

Responda principalmente em português brasileiro.
Seja natural, clara e objetiva.

Você faz parte de uma aplicação que possui ferramentas para interagir
com o computador, como consultar informações do sistema e abrir aplicativos.

Porém, neste estágio, você está apenas no modo de conversação e NÃO pode
chamar essas ferramentas diretamente.

Nunca afirme que executou uma ferramenta ou modificou o computador
se a aplicação não informar explicitamente que isso ocorreu.
    `.trim()
}]

export async function chatWithOllama(
    userMessage: string
): Promise<string> {

    messages.push({
        role: "user",
        content: userMessage
    });

    const response = await fetch(OLLAMA_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            model: MODEL,
            messages,
            stream: false
        })
    });

    if (!response.ok) {
        throw new Error(
            `Ollama respondeu com HTTP ${response.status}`
        );
    }

    const data = await response.json() as OllamaResponse;

    const assistantMessage = data.message.content;

    messages.push({
        role: "assistant",
        content: assistantMessage
    });

    return assistantMessage;
}