# D.A.I.S.Y.

**Dynamic Autonomous Intelligence System for You**

> Personal AI • Automation • Voice • Memory

D.A.I.S.Y. é uma assistente pessoal de inteligência artificial em desenvolvimento/alpha, criada para integrar conversa, automação, voz, memória e controle de dispositivos em uma única plataforma.

O objetivo do projeto é construir uma assistente capaz de interagir com o computador, executar ferramentas, consultar informações do sistema, automatizar tarefas e, futuramente, se comunicar com dispositivos móveis e modelos de IA locais ou em nuvem.

---

## Significado do nome

**D.A.I.S.Y.** significa:

**Dynamic Autonomous Intelligence System for You**

- **Dynamic** — adapta-se ao contexto e às necessidades do usuário.
- **Autonomous** — pode executar tarefas e automações por meio de ferramentas.
- **Intelligence** — utiliza inteligência artificial para interpretar solicitações e tomar decisões.
- **System** — funciona como um ecossistema composto por diferentes módulos.
- **For You** — foi projetada para funcionar como uma assistente pessoal personalizável.

---

## Open Source

Este projeto é open source e está sendo desenvolvido tanto como projeto pessoal quanto como projeto de estudo e portfólio.

Contribuições poderão ser aceitas conforme o projeto evoluir.

---

## Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo [`LICENSE`](LICENSE) para mais informações.

---

## Tecnologias usadas

Atualmente, o projeto utiliza:

- **TypeScript** e **Node.js**, com npm
- **Ollama** e modelo de linguagem local **llama3.2:3b**
- **Tool Manager** e interface compartilhada para ferramentas
- **Tool Calling experimental**, via decisões JSON do Router
- **Arquitetura Router/QA experimental**
- **Módulos nativos do Node.js**: `node:readline`, `node:os`, `node:child_process` e `node:util`
- **Git/GitHub**

Tecnologias planejadas para versões futuras:

- Speech-to-Text (ElevenLabs)
- Text-to-Speech (ElevenLabs)
- WebSockets
- Automação de Linux
- Automação de navegador
- Aplicativo Android
- Banco de dados para memória persistente

---

## Funcionalidades atuais

A versão alpha possui:

- CLI interativa e comandos básicos.
- Conversação local via Ollama e histórico temporário de conversa em memória durante a execução.
- Tool Manager para registro, resolução e execução de ferramentas.
- Consulta de sistema operacional, kernel, arquitetura, CPU e tempo de atividade.
- Consulta de memória RAM total, livre, usada e percentual de uso.
- Tool de processos com PID, nome, CPU e memória, ordenação por CPU e limite de resultados.
- Tool de interfaces de rede com IPv4/IPv6, separação de endereços internos e sem retorno de MAC.
- Abertura controlada de aplicações cadastradas em uma lista permitida.
- Interpretação de linguagem natural e roteamento experimental entre conversa e chamada de Tool.
- Etapa QA experimental que usa o modelo de conversa para formular respostas a partir do texto retornado pela Tool.

**Limitações atuais:** as Tools de processos e rede estão implementadas, mas ainda não estão registradas na CLI em `src/index.ts`. As Tools principais de consulta retornam `output` e `data`, porém o fluxo atual envia apenas o texto ao QA. O histórico é temporário, sem persistência em disco. O Agent Core definitivo e o Agent Loop ainda não estão implementados. O fluxo local seguido pelo Router ainda pode causar execução duplicada de Tools.

## Estrutura do projeto

```text
src/
├── ai/
│   ├── ollamaClient.ts
│   └── agents/
│       └── routerAgent.ts
├── core/
│   ├── tool.ts
│   └── toolManager.ts
├── tools/
│   ├── systemInfo.ts
│   ├── memoryInfo.ts
│   ├── processInfo.ts
│   ├── networkInfo.ts
│   ├── openApplication.ts
│   ├── about.ts
│   ├── exit.ts
│   ├── greeting.ts
│   └── help.ts
└── index.ts
```

## Segurança

A camada de segurança ainda está em desenvolvimento. A próxima prioridade é estabelecer uma Security Foundation antes de ampliar a autonomia da assistente.

- **Menor privilégio:** cada Tool deve ter apenas as permissões necessárias à sua responsabilidade.
- **Níveis de risco:** a interface já define `safe`, `confirmation` e `critical`, mas o campo ainda é opcional e não há aplicação centralizada da política.
- **Confirmação:** ações sensíveis exigirão confirmação explícita; esse controle central ainda está pendente.
- **Execução controlada:** nenhuma entrada do LLM deve ser executada diretamente no shell. A abertura de aplicações usa uma lista permitida e `spawn` com argumentos separados, sem shell; a consulta de processos usa `execFile` com comando e argumentos fixos.
- **Somente leitura:** as Tools de processos e rede consultam dados sem alterar o sistema.
- **Segredos:** tokens, credenciais e outros segredos devem permanecer fora do Git. O `.gitignore` já exclui `.env`, mas isso não substitui a revisão do conteúdo versionado.
- **Autorização determinística:** a IA poderá solicitar ações, mas a camada determinística da aplicação será responsável por autorizá-las. O Security Manager central ainda será implementado.

Validação centralizada, permissões por Tool, audit log, proteção contra prompt injection, separação de dados confiáveis e não confiáveis e redação de informações sensíveis permanecem pendentes.

---

## Como instalar

### Pré-requisitos

Tenha instalado:

- Node.js
- npm
- Git
- Ollama (com o modelo llama3.2:3b baixado)

O ambiente atual é voltado ao Linux. A consulta de processos requer o comando `ps`; a abertura de aplicações depende dos programas e formatos de instalação cadastrados na lista permitida.

### Obter o projeto

Clone o repositório usando a URL fornecida pela página do projeto no GitHub:

```bash
git clone "<URL_DO_REPOSITORIO>"
```

Entre na pasta:

```bash
cd D.A.I.S.Y
```

Instale as dependências:

```bash
npm install
```

---

## Como executar

Para iniciar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

O Ollama deve estar em execução com o modelo `llama3.2:3b` disponível. A CLI aceita conversas em português e comandos como `ajuda` e `sair`.

Para verificar erros de TypeScript:

```bash
npx tsc --noEmit
```

---

## Roadmap

### v0.1 — Foundation

- [x] Estrutura inicial em TypeScript
- [x] CLI interativa
- [x] Comandos básicos
- [x] Primeira Tool
- [x] Consulta de informações do sistema
- [x] Git e GitHub
- [x] Licença MIT
- [x] `.gitignore`
- [x] README inicial

### v0.2 — Tool System

- [x] Separar ferramentas por responsabilidade
- [x] Tool de memória RAM
- [x] Tool de processos
- [x] Tool de rede
- [x] Tool para abrir aplicações
- [x] Criar Tool Manager
- [x] Padronizar interface das Tools
- [x] Dados estruturados para Tools principais

Os itens de processos e rede representam as Tools implementadas; seu registro na CLI ainda está pendente. A interface comum existe, mas `schema` e `risk` ainda são opcionais.

### v0.2.1 — Security Foundation

- [ ] Security Manager central
- [ ] Sistema obrigatório de níveis de risco
- [ ] Confirmação para ações sensíveis
- [ ] Validação centralizada de argumentos
- [ ] Audit log
- [ ] Proteção contra execução arbitrária de shell
- [ ] Proteção contra prompt injection em conteúdo externo
- [ ] Separação entre dados confiáveis e não confiáveis
- [ ] Redação de informações sensíveis
- [ ] Permissões por Tool
- [ ] Testes de segurança

A lista permitida de aplicações e as chamadas sem shell já existem em Tools específicas. A proteção obrigatória e centralizada contra execução arbitrária ainda está pendente.

### v0.3 — AI Core

- [x] Integrar modelo de IA
- [x] Suporte a modelo local
- [x] Integração com Ollama
- [x] Interpretação de linguagem natural
- [x] Router/QA experimental
- [x] Tool Calling experimental

- [ ] Agent Core definitivo
- [ ] Tool Calling nativo integrado ao Agent Core
- [ ] Agent Loop
- [ ] Execução multi-tool segura
- [ ] Eliminar risco de execução duplicada de Tools
- [ ] Reduzir dependência de comandos fixos

### v0.3.1 — Multi-Agent Loop

- [ ] Specifier Agent
- [ ] Planner Agent
- [ ] Executor Agent
- [ ] Cleaner Agent
- [ ] Hardener Agent
- [ ] QA Agent
- [ ] Loop Controller
- [ ] Gates automáticos entre agentes
- [ ] Critérios de aprovação/reprovação
- [ ] Limite de iterações
- [ ] Retentativa por etapa

### v0.4 — Memory

- [ ] Memória de conversa além do histórico temporário da sessão
- [ ] Memória persistente
- [ ] Preferências do usuário
- [ ] Memória por projeto
- [ ] Busca contextual

### v0.5 — Voice

- [ ] Reconhecimento de voz (ElevenLabs planejado)
- [ ] Síntese de voz
- [ ] Palavra de ativação
- [ ] Comandos totalmente por voz

### v0.6 — Automation

- [ ] Automação de Linux
- [ ] Controle avançado de aplicações
- [ ] Controle de arquivos
- [ ] Automação de navegador
- [ ] Execução de tarefas encadeadas
- [ ] Sistema de permissões para ações sensíveis

### v0.7 — Mobile

- [ ] Aplicativo Android
- [ ] Comunicação PC ↔ celular
- [ ] Notificações
- [ ] Comandos remotos
- [ ] Sincronização entre dispositivos

### v1.0 — Personal AI Assistant

- [ ] IA local + nuvem
- [ ] Voz
- [ ] Memória
- [ ] Automação
- [ ] Sistema de plugins
- [ ] Controle multi-dispositivo
- [ ] Arquitetura modular e extensível

---

## Objetivo futuro

A meta final da D.A.I.S.Y. é permitir interações como:

```text
Você > Daisy, prepara meu ambiente de programação.

D.A.I.S.Y >
Abrindo editor...
Verificando repositório Git...
Iniciando serviços...
Abrindo documentação...

Ambiente pronto.
```

Ou:

```text
Você > Daisy, analisa por que meu computador está lento.

D.A.I.S.Y >
Verificando memória...
Analisando processos...
Consultando uso de CPU...

Encontrei um processo consumindo recursos acima do normal.
```

A intenção é transformar a D.A.I.S.Y. em uma assistente pessoal extensível, capaz de combinar inteligência artificial com ações reais no sistema.
## Status

> Projeto em desenvolvimento/alpha. Prioridade atual: Security Foundation.

A arquitetura, funcionalidades e tecnologias poderão mudar conforme a D.A.I.S.Y. evoluir.
