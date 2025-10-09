const OrderModel = require("../models/order.model");
const OrderNormalizer = require("../normalizers/order.normalizer");
const ValidationUtils = require("../utils/validation.utils");
const FileUtils = require("../utils/file.utils");
const FreelancerModel = require("../models/freelancer.model");
const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

class OrderController {

    static async getOrders(req, res) {
        const {onlyMine} = req.query;
        const filter = {};
        if (onlyMine) {
            filter.owner = req.user.id;
        }
        let orders = await OrderModel.find(filter).populate(['freelancer', 'owner']);
        orders = orders.map(item => OrderNormalizer.normalize(item));

        res.json({
            orders: orders
        });
    }

    static async getOrder(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр id"});
        }

        const order = await OrderModel.findOne({_id: id}).populate(['freelancer', 'owner']);

        if (!order) {
            return res.status(404)
                .json({error: true, message: "Заказ не найден"});
        }

        res.json(OrderNormalizer.normalize(order));
    }

    static async createOrder(req, res) {
        const {error} = ValidationUtils.addOrderValidation(req.body);

        if (error) {
            console.log(error.details);
            return res.status(400).json({error: true, message: error.details[0].message});
        }

        const body = req.body;

        const order = new OrderModel();
        order.description = body.description;
        order.deadlineDate = body.deadlineDate;
        order.scheduledDate = body.scheduledDate;
        const owner = await UserModel.findOne({_id: req.user.id});
        if (owner) {
            order.owner = new mongoose.Types.ObjectId(owner.id);
        } else {
            return res.status(400).json({error: true, message: 'Пользователь с таким id не найден'});
        }
        const freelancer = await FreelancerModel.findOne({_id: body.freelancer});
        if (freelancer) {
            order.freelancer = new mongoose.Types.ObjectId(freelancer.id);
        } else {
            return res.status(400).json({error: true, message: 'Фрилансер с таким id не найден'});
        }
        order.status = body.status;
        if (body.completeDate) {
            order.completeDate = body.completeDate;
        }
        order.amount = body.amount;

        const result = await order.save();

        if (result) {
            res.status(201).json({
                error: false,
                message: "Заказ успешно добавлен!",
                id: order.id
            });
        } else {
            res.status(400).json({error: true, message: "Ошибка добавления фрилансера!"});
        }
    }

    static async updateOrder(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр id"});
        }

        const body = req.body;

        const {error} = ValidationUtils.updateOrderValidation(req.body);

        if (error) {
            return res.status(400).json({error: true, message: error.details[0].message});
        }

        const order = await OrderModel.findOne({_id: id});
        if (!order) {
            return res.status(404)
                .json({error: true, message: "Заказ не найден"});
        }

        if (body.description) {
            order.description = body.description;
        }
        if (body.deadlineDate) {
            order.deadlineDate = body.deadlineDate;
        }
        if (body.scheduledDate) {
            order.scheduledDate = body.scheduledDate;
        }
        if (body.freelancer) {
            const freelancer = await FreelancerModel.findOne({_id: body.freelancer});
            if (freelancer) {
                order.freelancer = new mongoose.Types.ObjectId(freelancer.id);
            } else {
                return res.status(400).json({error: true, message: 'Фрилансер с таким id не найден'});
            }
        }
        if (body.status) {
            order.status = body.status;
        }
        if (body.hasOwnProperty('completeDate')) {
            order.completeDate = body.completeDate;
        }
        if (body.amount) {
            order.amount = body.amount;
        }

        const result = await order.save();

        if (result) {
            res.status(200).json({error: false, message: "Заказ успешно обновлен!"});
        } else {
            res.status(400).json({error: true, message: "Ошибка обновления фрилансера!"});
        }
    }

    static async deleteOrder(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр id"});
        }

        const result = await OrderModel.deleteOne({_id: id});

        if (result) {
            res.status(200).json({error: false, message: "Заказ успешно удален!"});
        } else {
            res.status(400).json({error: true, message: "Ошибка удаления фрилансера!"});
        }
    }
}

module.exports = OrderController;