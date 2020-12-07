const Discord = require('discord.js');
const client = new Discord.Client();
const Queue = require('bee-queue');
const queue = new Queue('testing');
require('dotenv').config();

client.on('message', (event) => { if(!event.author.bot) createJob('message', { client, event })});
client.login(process.env.TOKEN);

function createJob(eventName, data) {
  const job = queue.createJob({ eventName, data })

  job.save((err) => {
    if (err) console.error('job failed to save');
    console.log('[SAVED] ' + job.id);
  });


  job.on('succeeded', (result) => {
    result = typeof result === 'object' ? { embed: result } : result;
    if(result && eventName === 'message') { client.channels.cache.get(data.event.channel.id).send(result); }
    console.log('[DONE] ' + job.id + ' [OUTPUT] ' + result)
  });


  job.on('retrying', (err) => {
    console.log(
      `Job ${job.id} failed with error ${err.message} but is being retried!`
    );
  });

  job.on('failed', (err) => {
    console.log(`Job ${job.id} failed with error ${err.message}`);
  });

  job.on('progress', (progress) => {
    console.log(`Job ${job.id} reported progress: ${progress}%`);
  });
}