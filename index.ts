import {Client, Events, GatewayIntentBits} from 'discord.js';
import {Commands} from "./commands/commands";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.token).then(() => {
    console.log("Logged in");
});

client.on(Events.InteractionCreate, (interaction) => {
    console.log(interaction);
    if (!interaction.isChatInputCommand()) return;
    let command;
    // I'm not doing some stupid polymorphism bullshit when I could just have a case statement
    switch(interaction.commandName) {
        case "wavuwank":
            command = Commands.rankInfo;
            break;
        default:
        case "ping":
            command = Commands.ping;
            break;
    }

    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
    }
});