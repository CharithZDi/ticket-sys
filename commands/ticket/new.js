module.exports = {
	name: 'claim',
	category: 'Ticket',
	description: 'Creates a new ticket.',
	run: async (client, message, args, prefix) => {
		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('you already have a claim ticket, please close your exsisting ticket first before opening a new one!');
		}

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},

			],
			type: 'text',
		}).then(async channel => {
			message.reply({embed:{
				color:"RANDOM",
				description:`**you have successfully created a ticket! Please click on \n${channel} to view your ticket.**`
			}}).then(msg => msg.delete({ timeout: 5000 }));
			channel.send({embed:{
				color:"RANDOM",
				description:`**${message.author}, welcome to your claim ticket! Please be patient, stuff will be give your rewards shortly. If you would like to close this ticket please type \`p!close\`**`
			}});
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
			if(logchannel) {
				message.channel.bulkDelete(args[0])
            		.then(messages => message.logchannel.send({embed:{
						color:"RANDOM",
						description:`Ticket ${message.author.id} created. Click the following to veiw <#${channel.id}>`
					}}).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
					;
			}
		});
	},
};
