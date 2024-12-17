const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on(Events.ClientReady, () => {
    console.log(`${client.user?.username ?? `Unknown`}が起動しました!`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot){
        return;
    };

    if (!message.content.startsWith("!allkick")){
        return;
    };

    
    const members = await message.guild.members.fetch();
    members.forEach(async member => {
        if (member.user.bot){
            return;
        };
        if (member.user.id === client.user.id){
            return;
        };

        try {
            await member.kick();
            console.log(`${member.user.displayName}をキックしました．`);
        } catch (error){
            console.log("エラーが発生しました!");
        }
    })
});

client.login("");
