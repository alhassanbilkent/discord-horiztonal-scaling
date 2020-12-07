const { MessageEmbed } = require('discord.js');
exports.run = async (_client, _message, _args, done) => {
    return done(null, new MessageEmbed().setTitle('Help Command').setDescription('This works damn!'));
}

exports.config = {
	name: 'help',
	description: 'Example command.',
	aliases: [],
};