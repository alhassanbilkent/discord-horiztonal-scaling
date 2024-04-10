# Discord Bot Job Queue

This is a simple Discord bot project that utilizes a job queue system to handle tasks asynchronously. The bot listens for Discord messages and processes them using a job queue to perform tasks in the background.

## Features

- Listens for Discord messages and performs tasks asynchronously.
- Uses Bee-Queue for job queue management.
- Easily configurable through environment variables.

## Prerequisites

Before running the bot, make sure you have the following:

- Node.js installed on your machine.
- Discord Bot Token (get one from the Discord Developer Portal).
- Bee-Queue module installed (`npm install bee-queue`).

## Installation

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Create a `.env` file in the root directory and add your Discord Bot Token:

```
TOKEN=your_discord_bot_token_here
```

## How it Works

- The bot listens for messages using the `client.on('message', ...)` event handler.
- When a message is received, a job is created with the message data using `createJob()` function.
- The job is then saved to the queue for processing asynchronously.
- Once the job is completed, the result (if any) is sent back to the Discord channel.

## Configuration

You can configure the bot by adding your `TOKEN`: Your Discord Bot Token.

## Contributing

Feel free to contribute to this project by forking the repository and submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
