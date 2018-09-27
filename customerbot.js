const { ActivityTypes } = require('botbuilder');
const { CardFactory } = require('botbuilder');

const IntroCard = require('./resources/IntroCard.json');

class MyBot {
    constructor(userState) {
        this.userState = userState;
    }

    async onTurn(turnContext) {
        if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            await this.sendWelcomeMessage(turnContext);
        }
    }

    async sendWelcomeMessage(turnContext) {
        if (turnContext.activity.membersAdded.length !== 0) {
            for (var i in turnContext.activity.membersAdded) {
                if (turnContext.activity.membersAdded[i].id === turnContext.activity.recipient.id) {
                    await turnContext.sendActivity({
                        attachments: [CardFactory.adaptiveCard(IntroCard)]
                    });
                }
            }
        }
    }
}

module.exports.MyBot = MyBot;
