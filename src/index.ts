import * as readline from "node:readline";
import { getSystemInfo } from "./tools/systemInfo";

const assistantName: string = "D.A.I.S.Y.";

console.log(`\n${assistantName}`);
console.log("Dynamic Autonomous Intelligence System for You\n");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function stopAssistant(): void {
    rl.close();
    console.log("D.A.I.S.Y > Até depois, Mestre!");
}

function startAssistant(): void {

    rl.question("Você > ", (message: string) => {

        const command: string = message.trim().toLowerCase();

        if (command === "boa noite daisy" || command === "exit" || command === "sair" || command === "quit") {

            stopAssistant();
            return;

        } else if (command === "bom dia daisy" || command === "yo daisy" || command === "oi" || command === "on") {

            console.log(
                "D.A.I.S.Y > Olá Mestre, como posso ajudá-lo hoje?"
            );

        } else if (command === "ajuda" || command === "help") {

            console.log(
                "D.A.I.S.Y > Aqui estão os Comandos disponíveis: " +
                "'bom dia daisy', 'Yo daisy', 'bom dia daisy', 'on', 'boa noite daisy', 'ajuda', 'exit', 'sair', 'quit', 'sobre', 'about', 'quem é você?', 'informações do sistema', 'system info', 'sistema' "
            );
        } else if (command === "sobre" || command === "about" || command === "quem é você?") {

            console.log(
                "D.A.I.S.Y > Sou a D.A.I.S.Y, sua assistente de inteligência artificial autônoma!"
            );
        } else if (command === "informações do sistema" || command === "system info" || command === "sistema") {

            const systemInfo = getSystemInfo();
            console.log("D.A.I.S.Y > Informações do Sistema:");
            console.log(`Sistema: ${systemInfo.system}`);
            console.log(`Versão: ${systemInfo.release}`);
            console.log(`Arquitetura: ${systemInfo.architecture}`);
            console.log(`Hostname: ${systemInfo.hostname}`);
            console.log(`Plataforma: ${systemInfo.platform}`);
            console.log(`Usuário: ${systemInfo.userInfo.username}`);
            console.log(`Interfaces de Rede: ${JSON.stringify(systemInfo.networkInterfaces, null, 2)}`);
            console.log(`Velocidade da CPU: ${systemInfo.cpuSpeed} MHz`);
            console.log(`Modelo da CPU: ${systemInfo.cpuModel}`);
            console.log(`Núcleos da CPU: ${systemInfo.cpuCores}`);
            console.log(`Memória Total (GB): ${systemInfo.totalMemoryGB.toFixed(2)}`);
            console.log(`Memória Livre (GB): ${systemInfo.freeMemoryGB.toFixed(2)}`);
            console.log(`Tempo de Atividade (s): ${systemInfo.uptime}`);

        } else {

            console.log(
                `D.A.I.S.Y > Comando não reconhecido, senhor: ${message}`
            );

        }

        startAssistant();
    });
}

startAssistant();