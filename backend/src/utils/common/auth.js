const passport = require('passport');

class Auth {
    static async authenticate(req, res, next) {
        try {
            await passport.authenticate('jwt', (err, user, authenticateError) => {
                return Auth.processAuthenticate(req, res, next, err, user, authenticateError);
            })(req, res, next);
        } catch (err) {
            console.log(err);
            res.status(500).json({error: true, message: "Внутренняя ошибка сервера"});
        }
    }

    static processAuthenticate(req, res, next, err, user, authenticateError) {
        let baseError = null;

        if (authenticateError && authenticateError.message) {
            baseError = authenticateError.message;
        } else if (err && err.message) {
            baseError = err.message;
        } else if (!user) {
            baseError = "Пользователь не найден";
        }

        if (baseError) {
            const error = new Error(baseError);
            error.status = 401;
            return next(error);
        }

        req.user = user;

        return next();
    }

}

module.exports = Auth;