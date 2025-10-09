const BaseNormalizer = require("./base.normalizer");
const config = require("../config/config");

class OrderNormalizer extends BaseNormalizer {
    static normalize(order) {
        let obj = {
            id: order.id,
            number: order.number,
            description: order.description,
            deadlineDate: order.deadlineDate,
            scheduledDate: order.scheduledDate,
            owner: {
                id: order.owner._id,
                name: order.owner.name,
                lastName: order.owner.lastName,
            },
            completeDate: order.completeDate,
            amount: order.amount,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };

        if (order.freelancer && order.freelancer._id) {
            obj.freelancer = {
                id: order.freelancer._id,
                name: order.freelancer.name,
                lastName: order.freelancer.lastName,
                avatar: config.freelancerAvatarsPath + order.freelancer.avatar,
                level: order.freelancer.level,
            };
        }

        return obj;
    }
}

module.exports = OrderNormalizer;