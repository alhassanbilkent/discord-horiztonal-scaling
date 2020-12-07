module.exports = async (client, message, done) => {
	let prefix = '-';
	if(!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const cmd = client.commands.includes(command) ? require(`../commands/${command}`) : undefined;

	if(cmd) return cmd.run(client, message, args, done);
	else { return done();  }
};

