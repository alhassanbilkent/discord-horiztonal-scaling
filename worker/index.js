const Queue = require('bee-queue');
const queue = new Queue('testing');
const Message = require('./events/message')
const fs = require('fs');
const commands = [];
const events = [];

queue.on('ready', () => {
    queue.process((job, done) => {
      console.log('[PROCESSING] ' + job.id);
      return process(job.data, done);
    });
});

fs.readdir('./events/', async (err, files) => {
	if (err) return console.error(err);
	console.log('» » » » » » » » » Events » » » » » » » »');
	files.forEach(file => {
		const eventName = file.split('.')[0];
		console.log(`Loaded ${eventName}`);
		events.push(eventName);
	});
});


fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	console.log('» » » » » » » » » Commands » » » » » » » » »');

	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split('.')[0];
		if(props.config.aliases.length >= 0) console.log(`Loaded ${commandName}`);
		if(props.config.aliases.length >= 1) console.log(`Loaded ${commandName} | ${props.config.aliases.join(' | ')}`);
		commands.push(commandName, props);
		props.config.aliases.forEach((a) => { commands.push(a, props); });
	});
});


function process(job, done) {
  job.data.client.commands = commands;
  if(events.includes(job.eventName)) return require(`./events/${job.eventName}`)(job.data.client, job.data.event, done);
  else { return done(); }
}