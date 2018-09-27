// https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/03.welcome-users
const { ActivityTypes } = require('botbuilder');
const { CardFactory } = require('botbuilder');

const IntroCard = require('./resources/IntroCard.json');

const WELCOMED_USER = 'welcomedUserProperty';

// Welcome Bot
class MyBot {
    constructor(userState) {
        this.welcomedUserProperty = userState.createProperty(WELCOMED_USER);
        this.userState = userState;
    }

    async onTurn(turnContext) {
        if (turnContext.activity.type === ActivityTypes.Message) {
            let didBotWelcomedUser = await this.welcomedUserProperty.get(turnContext, false);

            // Tutorial has === false here? Should be equivalent
            if (didBotWelcomedUser === false) {
                await turnContext.sendActivity('Hi thanks for sending your first message, try sending another.');
                await this.welcomedUserProperty.set(turnContext, true);
            } else {
                let text = turnContext.activity.text.toLowerCase();
                await this.sendGenericMessage(turnContext, text);
            }
            this.userState.saveChanges(turnContext);
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            await this.sendWelcomeMessage(turnContext);
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type }] event detected`);
        }
    }

    async sendGenericMessage(turnContext, message) {
        // Static replies for sample, use LUIS for real processing.
        switch (message) {
        case 'hello':
        case 'hi':
        case 'hey':
            await turnContext.sendActivity('Hello to you again! Try saying "help" or "info" next');
            break;
        case 'info':
        case 'help':
            await turnContext.sendActivity({
                text: 'Intro Adaptive Card',
                attachments: [CardFactory.adaptiveCard(IntroCard)]
            });
            break;
        default:
            await turnContext.sendActivity('Whoops, I didn\'t quite get that. Please try again.');
        }
    }

    async sendWelcomeMessage(turnContext) {
        if (turnContext.activity.membersAdded.length !== 0) {
            for (var i in turnContext.activity.membersAdded) {
                if (turnContext.activity.membersAdded[i].id === turnContext.activity.recipient.id) {
                    await turnContext.sendActivity('Hey there! this is a welcome message from the bot. I am prompting you because the bot was detected entering the conversation.');
                }
            }
        }
    }
}

module.exports.MyBot = MyBot;
