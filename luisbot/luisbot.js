const { ActivityTypes } = require('botbuilder'); // Need TurnContext? Others didn't
// TurnContext
const { LuisRecognizer } = require('botbuilder-ai');
// LuisApplication, LuisPredictionOptions

const { CardFactory } = require('botbuilder');
const IntroCard = require('../resources/IntroCard.json');
// const { Order } = require('./dialogs/OrderStatus/Order');

const ORDER_STATUS_INTENT_ID = 'OrderStatus';
const STORE_INFO_INTENT_ID = 'StoreInfo';
const HELP_INTENT_ID = 'Help';
const NONE_INTENT_ID = 'None';

class LuisBot {
    constructor(application, luisPredictionOptions, userState) {
        this.luisRecognizer = new LuisRecognizer(application, luisPredictionOptions, true);
        this.userState = userState;
    }

    async onTurn(turnContext) {
        if (turnContext.activity.type === ActivityTypes.Message) {
            const results = await this.luisRecognizer.recognize(turnContext);
            const topIntent = results.luisResult.topScoringIntent;

            if (topIntent !== 'None') {
                await turnContext.sendActivity(`Top scoring intent: ${ topIntent.intent }, Score: ${ topIntent.score }`);
                switch (topIntent.intent) {
                    case ORDER_STATUS_INTENT_ID:
                        await turnContext.sendActivity('Do order status thing.');
                        break;
                    case STORE_INFO_INTENT_ID:
                        await turnContext.sendActivity('Do store info thing');
                        break;
                    case HELP_INTENT_ID:
                        await turnContext.sendActivity('Sure thing, an agent will be with you shortly.');
                        break;
                    case NONE_INTENT_ID:
                    default:
                        await turnContext.sendActivity('Nothing to be done.');
                        break;
                }
            } else {
                await turnContext.sendActivity('No intents found.');
            }
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate && turnContext.activity.recipient.id !== turnContext.activity.membersAdded[0].id) {
            await turnContext.sendActivity({
                attachments: [CardFactory.adaptiveCard(IntroCard)]
            });
        }
        await this.userState.saveChanges(turnContext);
    }
}

module.exports.LuisBot = LuisBot;
