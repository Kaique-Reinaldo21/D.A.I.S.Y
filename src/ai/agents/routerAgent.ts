export interface RouteDecision {
    action: "TOOL_CALL" | "CHAT";
    toolName?: string;
    parameters?: Record<string, any>;
    reasoning: string;
}

export async function runRouterAgent(userMessage: string, availableTools: any[]): Promise<RouteDecision> {
    const OLLAMA_URL = "http://localhost:11434/api/chat";
    const MODEL = "llama3.2:3b";

    // Extrai o nome e descrição das ferramentas para o Roteador entender o que existe
    const toolsDescription = availableTools.map(t =>
        `- ${t.function.name}: ${t.function.description}`
    ).join("\n");

    const systemPrompt = `Você é o Agente Roteador (Specifier) do sistema autônomo D.A.I.S.Y.
Sua única responsabilidade é analisar a mensagem do usuário e tomar uma decisão lógica de roteamento em formato JSON estruturado.
NÃO responda como um assistente conversacional. NÃO gere textos explicativos fora do JSON.

Ferramentas disponíveis no sistema:
${toolsDescription || "Nenhuma ferramenta disponível no momento."}

Regras de Decisão:
1. Se a intenção do usuário pode ser resolvida por uma das ferramentas disponíveis, defina a action como "TOOL_CALL".
2. Se o usuário quer apenas conversar, tirar dúvidas ou o pedido não se encaixa nas ferramentas, defina action como "CHAT".

Formato de Resposta (JSON):
{
    "action": "TOOL_CALL" ou "CHAT",
    "toolName": "nome_da_ferramenta_escolhida",
    "parameters": { "nome_do_parametro": "valor_extraido" },
    "reasoning": "Justificativa analítica curta do porquê desta decisão"
}`;

    const messages = [
        {
            role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: userMessage
        }
    ];

    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: MODEL,
            messages: messages, 
            format: "json",
            stream: false
        })
    });

    if (!response.ok) {
        throw new Error(`Roteador falhou com HTTP ${response.status}`);
    }

    const data = await response.json();
    let content = data.message.content.trim();

    // Filtro Antierros: Remove os blocos de código Markdown caso a IA os envie
    if (content.startsWith("```json")) {
        content = content.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (content.startsWith("```")) {
        content = content.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    try {
        const decision: RouteDecision = JSON.parse(content) as RouteDecision;
        return decision;
    } catch (error) {
        console.error("D.A.I.S.Y > O Roteador gerou um JSON inválido:", content);
        // Fallback de segurança: se o agente falhar, repassa para o chat normal
        return { 
            action: "CHAT", 
            reasoning: "Fallback preventivo devido a falha de parse no Roteador." 
        };
    }
}