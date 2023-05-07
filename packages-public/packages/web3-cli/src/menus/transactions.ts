import inquirer from "inquirer";
import { back, quit } from "./constants.js";
import { clearTerminal } from "../utils/index.js";

export async function transactionsMenu(): Promise<string> {
    clearTerminal();

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "Transactions",
        choices: [
            new inquirer.Separator(),
            {
                name: back,
                value: "/home",
            },
            {
                name: quit,
                value: "/quit",
            },
        ],
    });

    clearTerminal();

    return command;
}
