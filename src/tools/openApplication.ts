import { spawn } from "node:child_process";
import type { Tool } from "../core/tool";

interface Application {
    command: string;
    args: string[];
}

const applications: Record<string, Application> = {

    brave: {
        command: "brave-browser",
        args: []
    },

    firefox: {
        command: "flatpak",
        args: [
            "run",
            "org.mozilla.firefox"
        ]
    },

    vscode: {
        command: "flatpak",
        args: [
            "run",
            "com.visualstudio.code"
        ]
    },

    terminal: {
        command: "gnome-terminal",
        args: []
    },

    discord: {
        command: "/snap/bin/discord",
        args: []
    },

    steam: {
        command: "flatpak",
        args: [
            "run",
            "com.valvesoftware.Steam"
        ]
    }
};

function openApplication(
    application: Application
): Promise<void> {

    return new Promise((resolve, reject) => {

        const child = spawn(
            application.command,
            application.args,
            {
                detached: true,
                stdio: "ignore"
            }
        );

        child.once("error", reject);

        child.once("spawn", () => {
            child.unref();
            resolve();
        });
    });
}

export const openApplicationTool: Tool = {
    name: "open_application",
    aliases: [ "abrir", "abra", "open"],
    description: "Abre aplicativos instalados no computador.",
    schema: {
        type: "function",
        function: {
            name: "open_application",
            description: "Abre um aplicativo no computador (ex: brave, firefox, vscode, discord).",
            parameters: {
                type: "object",
                properties: {
                    appName: {
                        type: "string",
                        description: "O nome do aplicativo para abrir, em letras minúsculas."
                    }
                },
                required: ["appName"]
            }
        }
    },
    match(input: string): boolean {
        return (
            input === "open" ||
            input === "abrir" ||
            input === "abra" ||
            input.startsWith("open ") ||
            input.startsWith("abrir ") ||
            input.startsWith("abra ")
        );
    },
    async execute(input?: string | Record<string, any>){
      let appName = "";

        // Se o input vier da IA, será um objeto
        if (typeof input === "object" && input !== null) {
            appName = input.appName || "";
        } 
        // Se vier do terminal via texto
        else if (typeof input === "string") {
            appName = input.replace(/^(open|abrir|abra)\s*/, "").trim().toLowerCase();
        }

        if (!appName) {
            return { output: "D.A.I.S.Y > Qual aplicativo deseja que eu abra, Mestre?", awaitInput: true };
        }

        const application = applications[appName];
        if (!application) {
            return { output: `O aplicativo "${appName}" não está cadastrado.` };
        }

        try {
            await openApplication(application);
            return { output: `Abrindo ${appName}...` };
        } catch (error) {
            return { output: `Erro ao abrir ${appName}: ${error}` };
        }
    }
};