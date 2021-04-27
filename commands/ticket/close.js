/* eslint-disable no-unused-vars */
const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = {
	name: 'close',
	category: 'Ticket',
	description: 'Closes the ticket.',

	run: async (client, message, args) => {
		const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));

			
			message.channel.updateOverwrite(member.user, {
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false,
				ATTACH_FILES: false,
				READ_MESSAGE_HISTORY: false,
			})

			message.channel.send({embed: {
				color: "RANDOM",
				description: `**${message.channel} Ticket  have been closed by ${message.author}**`,					
				}})

			const emoji1 = "⛔"	
			const emoji2 = "🔓"	
			const emoji3 = "📑"		
			const embedw = new MessageEmbed()
			.setDescription(`:no_entry: Delete Ticket\n:unlock: Reopen Ticket\n:bookmark_tabs: Save transcript`)
			.setColor('GREEN'); 
			let msgembed = await message.channel.send(embedw)
			await msgembed.react(emoji1)
			await msgembed.react(emoji2)
			await msgembed.react(emoji3)

			client.on('messageReactionAdd', async (reaction, user) => {
				if (reaction.message.partial) await reaction.message.fetch();
				if (reaction.partial) await reaction.fetch();
				if (user.bot) return;
				if (!reaction.message.guild) return;
		
				if (reaction.message.channel.id == message.channel) {
					if (reaction.emoji.name === emoji1) {
						await reaction.message.guild.members.cache.get(user.id)
						message.channel.send({embed: {
							color:"RANDOM",
							description:"**Ticket will be deleted in ` 15 seconds `**"
						}}).then({ timeout: 30000 }).then(message.channel.delete())
					}
					if (reaction.emoji.name === emoji2) {
						await reaction.message.guild.members.cache.get(user.id)
						message.channel.updateOverwrite(member.user, {
							VIEW_CHANNEL: true,
							SEND_MESSAGES: true,
							ATTACH_FILES: true,
							READ_MESSAGE_HISTORY: true,
						})
							.then(() => {
								message.channel.send({embed:{
									color:"RANDOM",
									description: `**Successfully re-opened ${message.channel}**`
									
								}});
							});
					}
					if (reaction.emoji.name === emoji3) {
						await reaction.message.guild.members.cache.get(user.id)

								const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (message.member.hasPermission('ADMINISTRATOR') || channel.name === `ticket-${message.author.id}`) {
				channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Chat transcript for ${channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('An error occurred, please try again!');
					}

					message.reply({embed:{
						color:"RANDOM",
						description:`**the transcript is complete. Please [\`click here\`](${response.url}) to view the transcript**`
					}});
				});
			}
		}
						

					}
				} else {
					return;
				}
			});

			
	}

}
					
			
		


