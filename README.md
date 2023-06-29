# Microsoft_Chatbot

# Microsoft Bot Framework SDK Bot with Lex Integration

This repository contains a bot built using the Microsoft Bot Framework SDK that integrates with Amazon Lex for natural language understanding and conversation management.


## Deployment

To deploy the bot and integrate it with Lex, follow these steps:

1. Clone the repository:


2. Open the `bot.js` file and make the necessary changes to configure the Lex integration. Update the following environment variables with your AWS credentials and region:

   ```javascript
   const AWS_REGION = process.env.AWS_REGION;
   const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
   const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
   ```

   Update the following parameters with your Lex bot details:

   ```javascript
   const params = {
       botId: "<your-lex-bot-id>",
       botAliasId: "<your-lex-bot-alias-id>",
       localeId: "en_US",
       sessionId: context.activity.from.id,
       text: context.activity.text.trim()
   };
   ```



## Usage

To use the bot, you can send messages to it using the configured channels (e.g., Teams, Web Chat). The bot will pass the user's message to Amazon Lex for natural language understanding and conversation management. The Lex response will be sent back to the user through the configured channel.

## Customization

If you want to customize the bot's behavior or add more features, you can modify the `bot.js` file and redeploy the bot using the Azure CLI.

