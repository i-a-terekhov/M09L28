const FreelancerModel = require("../models/freelancer.model");
const OrderModel = require("../models/order.model");
const FreelancerNormalizer = require("../normalizers/freelancer.normalizer");
const ValidationUtils = require("../utils/validation.utils");
const FileUtils = require("../utils/file.utils");

class FreelancerController {

    static async getFreelancers(req, res) {
        const {short} = req.query;

        let freelancers = await FreelancerModel.find({});
        freelancers = freelancers.map(item => FreelancerNormalizer.normalize(item, !short));

        res.json({
            freelancers: freelancers
        });
    }

    static async getFreelancer(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр id"});
        }

        const freelancer = await FreelancerModel.findOne({_id: id});

        if (!freelancer) {
            return res.status(404)
                .json({error: true, message: "Фрилансер не найден"});
        }

        res.json(FreelancerNormalizer.normalize(freelancer));
    }

    static async createFreelancer(req, res) {
        const {error} = ValidationUtils.addFreelancerValidation(req.body);

        if (error) {
            console.log(error.details);
            return res.status(400).json({error: true, message: error.details[0].message});
        }

        const body = req.body;

        const existingFreelancer = await FreelancerModel.findOne({email: req.body.email});
        if (existingFreelancer) {
            return res.status(400).json({error: true, message: "Фрилансер с таким email уже существует!"});
        }

        const freelancer = new FreelancerModel();
        freelancer.name = body.name;
        freelancer.lastName = body.lastName;
        freelancer.email = body.email;
        freelancer.education = body.education;
        freelancer.skills = body.skills;
        freelancer.info = body.info;
        freelancer.location = body.location;
        freelancer.level = body.level;

        if (body.avatarBase64) {
            try {
                freelancer.avatar = await FileUtils.generateAndSavePublicImage('images/freelancers/avatars/', body.avatarBase64);
            } catch (e) {
                console.log(e);
                return res.status(500).json({error: true, message: "Ошибка загрузки файла!"});
            }
        }

        const result = await freelancer.save();

        if (result) {
            res.status(201).json({
                error: false,
                message: "Фрилансер успешно добавлен!",
                id: freelancer.id
            });
        } else {
            res.status(400).json({error: true, message: "Ошибка добавления фрилансера!"});
        }
    }

    static async updateFreelancer(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр id"});
        }

        const body = req.body;

        const {error} = ValidationUtils.updateFreelancerValidation(req.body);

        if (error) {
            console.log(error.details);
            return res.status(400).json({error: true, message: error.details[0].message});
        }

        const freelancer = await FreelancerModel.findOne({_id: id});
        if (!freelancer) {
            return res.status(404)
                .json({error: true, message: "Фрилансер не найден"});
        }

        if (body.name) {
            freelancer.name = body.name;
        }
        if (body.lastName) {
            freelancer.lastName = body.lastName;
        }
        if (body.email) {
            freelancer.email = body.email;
        }
        if (body.education) {
            freelancer.education = body.education;
        }
        if (body.skills) {
            freelancer.skills = body.skills;
        }
        if (body.info) {
            freelancer.info = body.info;
        }
        if (body.location) {
            freelancer.location = body.location;
        }
        if (body.level) {
            freelancer.level = body.level;
        }
        if (body.avatarBase64) {
            try {
                freelancer.avatar = await FileUtils.generateAndSavePublicImage('images/freelancers/avatars/', body.avatarBase64);
            } catch (e) {
                return res.status(500).json({error: true, message: "Ошибка загрузки файла!"});
            }
        }

        const result = await freelancer.save();

        if (result) {
            res.status(200).json({error: false, message: "Фрилансер успешно обновлен!"});
        } else {
            res.status(400).json({error: true, message: "Ошибка обновления фрилансера!"});
        }
    }

    static async deleteFreelancer(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр id"});
        }

        const ordersWithFreelancer = await OrderModel.find({freelancer: id});
        console.log(ordersWithFreelancer);
        if (ordersWithFreelancer && ordersWithFreelancer.length > 0) {
            return res.status(400)
                .json({error: true, message: "Нельзя удалить фрилансера, привязанного к заказам"});
        }

        const result = await FreelancerModel.deleteOne({_id: id});

        if (result) {
            res.status(200).json({error: false, message: "Фрилансер успешно удален!"});
        } else {
            res.status(400).json({error: true, message: "Ошибка удаления фрилансера!"});
        }
    }
}

module.exports = FreelancerController;