const {
    TurnContext,
    MessageFactory,
    TeamsInfo,
    TeamsActivityHandler,
    CardFactory,
    ActionTypes
} = require('botbuilder');
const {LexRuntimeV2Client, RecognizeTextCommand}=require("@aws-sdk/client-lex-runtime-v2");

const AWS_REGION=os.environ['AWS_REGION'];
const AWS_ACCESS_KEY_ID=os.environ['AWS_ACCESS_KEY_ID'];
const AWS_SECRET_ACCESS_KEY=os.environ['AWS_SECRET_ACCESS_KEY'];

class EchoBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            TurnContext.removeRecipientMention(context.activity);
            await this.callLex(context);
            await next();
        });

        this.onMembersAddedActivity(async (context, next) => {
            context.activity.membersAdded.forEach(async (teamMember) => {
                if (teamMember.id !== context.activity.recipient.id) {
                    await context.sendActivity(`Hi, I'm a Dalek. Welcome to the team ${teamMember.givenName} ${teamMember.surname}`);
                }
            });
            await next();
        });
    }

    async callLex(context) {
        const client=new LexRuntimeV2Client({region:AWS_REGION,
                                             credentials:{accessKeyId:AWS_ACCESS_KEY_ID,secretAccessKey:
                                             AWS_SECRET_ACCESS_KEY}});
        const params = {
            botId: "RZPSJ9UTRX",
            botAliasId: "TSTALIASID",
            localeId:"en_US",
            sessionId: context.activity.from.id,
            text: context.activity.text.trim()
        };

        try{
            const command=new RecognizeTextCommand(params);
            const response=await client.send(command);

            const message=response.messages[0].content;
            await context.sendActivity(MessageFactory.text(message,message));
        }catch(error){
            console.error(`Error calling Lex: ${error}`);
            await context.sendActivity(MessageFactory.text("Oops, somthing went wrong"));
        }
    }
}

module.exports.EchoBot =EchoBot;
