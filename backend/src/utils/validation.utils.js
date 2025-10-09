const Joi = require("@hapi/joi");
const config = require("../config/config");

class ValidationUtils {
    static signupValidation(data) {
        const schema = Joi.object({
            name: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().min(6).required().email()
                .messages({
                    'string.empty': `Необходимо заполнить "E-mail"`,
                    'string.email': `"E-mail" неверный`,
                    'string.min': `"E-mail" неверный`,
                    'any.required': `Необходимо заполнить "E-mail"`
                }),
            password: Joi.string().min(6).required()
                .messages({
                    'string.empty': `Необходимо заполнить "Пароль"`,
                    'string.min': `"Пароль" должен иметь минимум 6 символов`,
                    'any.required': `Необходимо заполнить "Пароль"`
                }),
        });
        return schema.validate(data);
    }

    static loginValidation(data) {
        const schema = Joi.object({
            email: Joi.string().min(6).required().email()
                .messages({
                    'string.empty': `Необходимо заполнить "E-mail"`,
                    'string.email': `"E-mail" неверный`,
                    'string.min': `"E-mail" неверный`,
                    'any.required': `Необходимо заполнить "E-mail"`
                }),
            password: Joi.string().min(6).required()
                .messages({
                    'string.empty': `Необходимо заполнить "Пароль"`,
                    'string.min': `"Пароль" должен иметь минимум 6 символов`,
                    'any.required': `Необходимо заполнить "Пароль"`
                }),
            rememberMe: Joi.boolean().default(false),
        });
        return schema.validate(data);
    }

    static refreshTokenValidation(data) {
        const schema = Joi.object({
            refreshToken: Joi.string().required()
                .messages({
                    'string.empty': `Необходимо заполнить "Токен"`,
                    'any.required': `Необходимо заполнить "Токен"`
                }),
        });
        return schema.validate(data);
    }

    static addFreelancerValidation(data) {
        const schema = Joi.object({
            name: Joi.string().required()
                .messages({
                    'any.required': `Необходимо заполнить "Имя"`,
                    'string.empty': `"Имя" не должно быть пустым`,
                }),
            lastName: Joi.string().required()
                .messages({
                    'any.required': `Необходимо заполнить "Фамилию"`,
                    'string.empty': `"Фамилия" не должна быть пустой`,
                }),
            email: Joi.string().email().required()
                .messages({
                    'any.required': `Необходимо указать "Email"`,
                    'string.email': `"Email" должен быть действительным адресом электронной почты`,
                    'string.empty': `"Email" не должен быть пустым`,
                }),
            level: Joi.string().valid(
                config.freelancerLevels.junior,
                config.freelancerLevels.middle,
                config.freelancerLevels.senior
            ).required()
                .messages({
                    'any.required': `Необходимо указать "Уровень"`,
                    'string.empty': `"Уровень" не должен быть пустым`,
                    'any.only': `"Уровень" должен быть одним из следующих значений: ${config.freelancerLevels.junior}, ${config.freelancerLevels.middle}, ${config.freelancerLevels.senior}`,
                }),
            education: Joi.string().required()
                .messages({
                    'any.required': `Необходимо указать "Образование"`,
                    'string.empty': `"Образование" не должно быть пустым`,
                }),
            location: Joi.string().required()
                .messages({
                    'any.required': `Необходимо указать "Местоположение"`,
                    'string.empty': `"Местоположение" не должно быть пустым`,
                }),
            skills: Joi.string().required()
                .messages({
                    'any.required': `Необходимо указать "Навыки"`,
                    'string.empty': `"Навыки" не должны быть пустыми`,
                }),
            info: Joi.string().required()
                .messages({
                    'any.required': `Необходимо указать "Информацию"`,
                    'string.empty': `"Информация" не должна быть пустой`,
                }),
            avatarBase64: Joi.string()
                .pattern(/^data:image\/[a-zA-Z]*;base64,[^\s]+$/)
                .messages({
                    'string.empty': `"Аватар" не должен быть пустой`,
                    'string.pattern.base': `"Аватар" должен быть представлен в формате Base64`,
                }),
        });
        return schema.validate(data);
    }

    static updateFreelancerValidation(data) {
        const schema = Joi.object({
            name: Joi.string()
                .messages({
                    'string.empty': `"Имя" не должно быть пустым`,
                }),
            lastName: Joi.string()
                .messages({
                    'string.empty': `"Фамилия" не должна быть пустой`,
                }),
            email: Joi.string().email()
                .messages({
                    'string.email': `"Email" должен быть действительным адресом электронной почты`,
                    'string.empty': `"Email" не должен быть пустым`,
                }),
            level: Joi.string().valid(
                config.freelancerLevels.junior,
                config.freelancerLevels.middle,
                config.freelancerLevels.senior
            )
                .messages({
                    'string.empty': `"Уровень" не должен быть пустым`,
                    'any.only': `"Уровень" должен быть одним из следующих значений: ${config.freelancerLevels.junior}, ${config.freelancerLevels.middle}, ${config.freelancerLevels.senior}`,
                }),
            education: Joi.string()
                .messages({
                    'string.empty': `"Образование" не должно быть пустым`,
                }),
            location: Joi.string()
                .messages({
                    'string.empty': `"Местоположение" не должно быть пустым`,
                }),
            skills: Joi.string()
                .messages({
                    'string.empty': `"Навыки" не должны быть пустыми`,
                }),
            info: Joi.string()
                .messages({
                    'string.empty': `"Информация" не должна быть пустой`,
                }),
            avatarBase64: Joi.string()
                .pattern(/^data:image\/[a-zA-Z]*;base64,[^\s]+$/)
                .messages({
                    'string.empty': `"Аватар" не должен быть пустой`,
                    'string.pattern.base': `"Аватар" должен быть представлен в формате Base64`,
                }),
        });
        return schema.validate(data);
    }

    static updateOrderValidation(data) {
        const schema = Joi.object({
            description: Joi.string()
                .messages({
                    'string.empty': `"Описание" не должно быть пустым`,
                }),
            deadlineDate: Joi.string()
                .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/)
                .messages({
                    'string.empty': `"Дата выполнения" не должна быть пустой`,
                    'string.pattern.base': `"Дата выполнения" должна быть датой в формате ISO 8601`,
                }),
            scheduledDate: Joi.string()
                .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/)
                .messages({
                    'string.empty': `"Запланированная дата выполнения" не должна быть пустой`,
                    'string.pattern.base': `"Запланированная дата выполнения" должна быть датой в формате ISO 8601`,
                }),
            freelancer: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
                .messages({
                    'string.empty': `"Фрилансер" не должно быть пустым`,
                    'string.pattern.base': `"Фрилансер" должен быть представлен строкой в формате ObjectID`,
                }),
            status: Joi.string().valid(
                config.orderStatuses.new,
                config.orderStatuses.confirmed,
                config.orderStatuses.success,
                config.orderStatuses.canceled
            )
                .messages({
                    'string.empty': `"Статус" не должен быть пустым`,
                    'any.only': `"Статус" должен быть одним из следующих значений: ${config.orderStatuses.new}, ${config.orderStatuses.confirmed}, ${config.orderStatuses.success}, ${config.orderStatuses.canceled}`,
                }),
            completeDate: Joi.string()
                .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/)
                .allow(null)
                .messages({
                    'string.empty': `"Дата выполнения" не должна быть пустой`,
                    'string.pattern.base': `"Дата выполнения" должна быть датой в формате ISO 8601`,
                }),
            amount: Joi.number().integer()
                .messages({
                    'number.base': `"Сумма" не должна быть пустым`,
                    'number.integer': `"Сумма" должна быть целым числом`,
                }),
        });
        return schema.validate(data);
    }

    static addOrderValidation(data) {
        const schema = Joi.object({
            description: Joi.string().required()
                .messages({
                    'any.required': `Необходимо заполнить "Описание"`,
                    'string.empty': `"Описание" не должно быть пустым`,
                }),
            deadlineDate: Joi.string()
                .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/)
                .required()
                .messages({
                    'any.required': `Необходимо заполнить "Дата выполнения"`,
                    'string.empty': `"Дата выполнения" не должна быть пустой`,
                    'string.pattern.base': `"Дата выполнения" должна быть датой в формате ISO 8601`,
                }),
            scheduledDate: Joi.string()
                .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/)
                .required()
                .messages({
                    'any.required': `Необходимо заполнить "Запланированная дата выполнения"`,
                    'string.empty': `"Запланированная дата выполнения" не должна быть пустой`,
                    'string.pattern.base': `"Запланированная дата выполнения" должна быть датой в формате ISO 8601`,
                }),
            freelancer: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/)
                .messages({
                    'any.required': `Необходимо заполнить "Фрилансер"`,
                    'string.empty': `"Фрилансер" не должно быть пустым`,
                    'string.pattern.base': `"Фрилансер" должен быть представлен строкой в формате ObjectID`,
                }),
            status: Joi.string().required().valid(
                config.orderStatuses.new,
                config.orderStatuses.confirmed,
                config.orderStatuses.success,
                config.orderStatuses.canceled
            ).messages({
                'any.required': `Необходимо заполнить "Статус"`,
                'string.empty': `"Статус" не должен быть пустым`,
                'any.only': `"Статус" должен быть одним из следующих значений: ${config.orderStatuses.new}, ${config.orderStatuses.confirmed}, ${config.orderStatuses.success}, ${config.orderStatuses.canceled}`,
            }),
            completeDate: Joi.string()
                .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/)
                .allow(null)
                .messages({
                    'string.empty': `"Дата выполнения" не должна быть пустой`,
                    'string.pattern.base': `"Дата выполнения" должна быть датой в формате ISO 8601`,
                }),
            amount: Joi.number().integer().required()
                .messages({
                    'any.required': `Необходимо заполнить "Сумма"`,
                    'number.base': `"Сумма" не должна быть пустым`,
                    'number.integer': `"Сумма" должна быть целым числом`,
                }),
        });
        return schema.validate(data);
    }
}

module.exports = ValidationUtils;