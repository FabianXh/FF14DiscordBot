const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gaming')
		.setDescription('Makes Tygan do the thing'),
	async execute(interaction) {
		await interaction.reply('<se.6> WENZ PULL');
	},
};
