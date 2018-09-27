const { ActivityTypes, TurnContext } = require('botbuilder'); // Need TurnContext? Others didn't

const { LuisApplication, LuisPredictionOptions, LuisRecognizer } = require('botbuilder-ai');

const { CardFactory } = require('botbuilder');
const IntroCard = require('./resources/IntroCard.json');

class LuisBot {
    constructor(application, luisPredictionOptions, includeApiResults) {
        this.luisRecognizer = new LuisRecognizer(application, luisPredictionOptions, true);
    }

    async onTurn(turnContext) {
        if (turnContext.activity.type === ActivityTypes.Message) {
            const results = await this.luisRecognizer.recognize(turnContext);
            const topIntent = results.luisResult.topScoringIntent;

            if (topIntent !== 'None') {
                await turnContext.sendActivity(`Top scoring intent: ${ topIntent.intent }, Score: ${ topIntent.score }`);
            } else {
                await turnContext.sendActivity('No intents found.');
            }
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate && turnContext.activity.recipient.id !== turnContext.activity.membersAdded[0].id) {
            await turnContext.sendActivity({
                attachments: [CardFactory.adaptiveCard(IntroCard)]
            });
        }
    }
}

module.exports.LuisBot = LuisBot;
