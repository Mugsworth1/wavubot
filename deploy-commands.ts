import {REST, Routes} from "discord.js";
import {Commands} from "./commands/commands";

const commands = [];

for (const command of Commands.allCommands) {
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] Dodgy command ${command}`);
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationCommands(process.env.clientID), { body: commands });

        console.log(`Successfully reloaded ${data} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();