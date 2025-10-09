const mongoose = require('mongoose');
const config = require('../config/config');

const OrderSchema = new mongoose.Schema({
    number: {type: Number, unique: true, index: true},
    description: String,
    deadlineDate: Date,
    scheduledDate: Date,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    freelancer: {type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true},
    status: {
        type: String,
        enum: [config.orderStatuses.new, config.orderStatuses.confirmed, config.orderStatuses.success, config.orderStatuses.canceled],
        default: config.orderStatuses.new
    },
    completeDate: Date,
    amount: Number,
}, {timestamps: true});
OrderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastOrder = await this.constructor.findOne().sort({number: -1}).exec();

        if (lastOrder) {
            this.number = lastOrder.number + 1;
        } else {
            this.number = 1; // Если это первый заказ, начните с номера 1
        }
    }
    next();
});
OrderSchema.index({number: 1}, {unique: true});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;