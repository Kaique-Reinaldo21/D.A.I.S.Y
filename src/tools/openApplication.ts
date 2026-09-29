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

    name: "open",

    aliases: [
        "abrir",
        "abra"
    ],

    description:
        "Abre aplicativos instalados no computador.",

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

    async execute(input?: string) {

        if (!input) {
            return {
                output:
                    "D.A.I.S.Y > Por favor, diga qual aplicativo deseja abrir."
            };
        }

        const appName = input
            .replace(/^(open|abrir|abra)\s*/, "")
            .trim()
            .toLowerCase();

        if (!appName) {
            return {
                output:
                    "D.A.I.S.Y > Qual aplicativo deseja que eu abra, Mestre?",
                awaitInput: true
            };
        }

        const application = applications[appName];

        if (!application) {
            return {
                output:
                    `D.A.I.S.Y > O aplicativo "${appName}" não está cadastrado.`
            };
        }

        try {

            await openApplication(application);

            return {
                output:
                    `D.A.I.S.Y > Abrindo ${appName}...`
            };

        } catch (error) {

            return {
                output:
                    `D.A.I.S.Y > Não consegui abrir ${appName}: ${error}`
            };
        }
    }
};