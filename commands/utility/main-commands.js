const { SlashCommandBuilder } = require('@discordjs/builders');

new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');