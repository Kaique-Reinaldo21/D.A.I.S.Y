# D.A.I.S.Y.

**Dynamic Autonomous Intelligence System for You**

> Personal AI • Automation • Voice • Memory

D.A.I.S.Y. é uma assistente pessoal de inteligência artificial em desenvolvimento, criada para integrar conversa, automação, voz, memória e controle de dispositivos em uma única plataforma.

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

## Tecnologias usadas

Atualmente, o projeto utiliza:

- **TypeScript**
- **Node.js**
- **npm**
- **Node.js Readline**
- **Node.js OS module**
- **Git**
- **GitHub**

Tecnologias planejadas para versões futuras:

- Ollama / modelos locais
- Tool Calling
- Speech-to-Text
- Text-to-Speech
- WebSockets
- Automação de Linux
- Automação de navegador
- Aplicativo Android
- Banco de dados para memória persistente

---

## Funcionalidades atuais

A versão atual da D.A.I.S.Y. já possui:

- Interface interativa via terminal
- Reconhecimento de comandos básicos
- Comandos de inicialização e encerramento
- Comando de ajuda
- Informações sobre a própria assistente
- Consulta de informações reais do sistema
- Consulta de:
  - Sistema operacional
  - Versão do kernel
  - Arquitetura
  - Hostname
  - Plataforma
  - Usuário
  - Interfaces de rede
  - Modelo da CPU
  - Velocidade da CPU
  - Quantidade de núcleos
  - Memória RAM total
  - Memória RAM livre
  - Tempo de atividade do sistema

---

## Como instalar

### Pré-requisitos

Tenha instalado:

- Node.js
- npm
- Git

Versões usadas durante o desenvolvimento inicial:

```bash
node -v
# v24.x

npm -v
# v11.x
```

### Clonar o repositório

Via SSH:

```bash
git clone git@github.com:Kaique-Reinaldo21/D.A.I.S.Y.git
```

Ou via HTTPS:

```bash
git clone https://github.com/Kaique-Reinaldo21/D.A.I.S.Y.git
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

Para verificar erros de TypeScript:

```bash
npx tsc --noEmit
```

Exemplo:

```text
D.A.I.S.Y.
Dynamic Autonomous Intelligence System for You

Você > oi
D.A.I.S.Y > Olá Mestre, como posso ajudá-lo hoje?

Você > informações do sistema
D.A.I.S.Y > Informações do Sistema:
Sistema: Linux
Arquitetura: x64
...
```

---

## Estrutura de pastas

```text
D.A.I.S.Y/
├── src/
│   ├── index.ts
│   └── tools/
│       └── systemInfo.ts
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### `src/index.ts`

Responsável atualmente por:

- Inicializar a D.A.I.S.Y.
- Ler comandos pelo terminal
- Interpretar comandos básicos
- Chamar ferramentas
- Exibir respostas

### `src/tools/`

Diretório responsável pelas ferramentas utilizadas pela assistente.

Atualmente:

```text
tools/
└── systemInfo.ts
```

`systemInfo.ts` consulta informações reais do computador usando o módulo `os` do Node.js.

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

- [ ] Separar ferramentas por responsabilidade
- [ ] Tool de memória RAM
- [ ] Tool de processos
- [ ] Tool de rede
- [ ] Tool para abrir aplicações
- [ ] Criar um gerenciador de Tools
- [ ] Padronizar respostas das ferramentas

### v0.3 — AI Core

- [ ] Integrar modelo de IA
- [ ] Suporte a modelo local
- [ ] Integração com Ollama
- [ ] Tool Calling
- [ ] Interpretação de linguagem natural
- [ ] Remover dependência de comandos fixos

### v0.4 — Memory

- [ ] Memória de conversa
- [ ] Memória persistente
- [ ] Preferências do usuário
- [ ] Memória por projeto
- [ ] Busca contextual

### v0.5 — Voice

- [ ] Reconhecimento de voz
- [ ] Síntese de voz
- [ ] Palavra de ativação
- [ ] Comandos totalmente por voz

### v0.6 — Automation

- [ ] Automação de Linux
- [ ] Controle de aplicações
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

---

## Open Source

Este projeto é open source e está sendo desenvolvido tanto como projeto pessoal quanto como projeto de estudo e portfólio.

Contribuições poderão ser aceitas conforme o projeto evoluir.

---

## Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo [`LICENSE`](LICENSE) para mais informações.

---

## Status

> 🚧 Projeto em desenvolvimento.

A arquitetura, funcionalidades e tecnologias poderão mudar conforme a D.A.I.S.Y. evoluir.
