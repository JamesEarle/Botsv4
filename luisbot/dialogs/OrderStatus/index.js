const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');

const ORDER_STATUS_DIALOG_ID = 'OrderStatus';
const ORDER_NUMBER_PROMPT_ID = 'OrderNumberPrompt';

class OrderStatusDialog extends ComponentDialog {
    constructor(dialogId) {
        super(dialogId);

        if (!dialogId) throw ('Missing parameter. `dialogId` is required.');

        this.addDialog(new WaterfallDialog(ORDER_STATUS_DIALOG_ID, [
            this.promptForOrderNumber.bind(this),
            this.displayOrderStatusStep.bind(this)
        ]));

        this.addDialog(new TextPrompt(ORDER_NUMBER_PROMPT_ID, this.validateOrdernumber));
    }

    async initializeStateStep(step) {

    }

    async promptForOrderNumber(step) {
        // Add logic for if it was already given, or if we know it already
        return await step.prompt(ORDER_NUMBER_PROMPT_ID, 'Okay, what is your order number?');
    }

    async displayOrderStatusStep(step) {

    }

    async validateOrderNumber(validatorContext) {
        // TODO
        return undefined;
    }
}

exports.OrderStatusDialog = OrderStatusDialog;
