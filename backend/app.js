const express = require('express');
const cors = require('cors');
const freelancerRoutes = require('./src/routes/freelancer.routes');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const orderRoutes = require('./src/routes/order.routes');
const MongoDBConnection = require("./src/utils/common/connection");
const config = require("./src/config/config");
const path = require('path');
const passport = require('passport');
const UserModel = require("./src/models/user.model");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

MongoDBConnection.getConnection((error, connection) => {
    if (error || !connection) {
        console.log('Db connection error', error);
        return;
    }
    const app = express();

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json({limit: '50mb'}));
    app.use(cors());

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: config.secret,
        algorithms: ["HS256"],
    }, async (payload, next) => {

        if (!payload.id) {
            return next(new Error('Не валидный токен'));
        }

        let user = null;
        try {
            user = await UserModel.findOne({_id: payload.id});
        } catch (e) {
            console.log(e);
        }

        if (user) {
            if (!user.refreshToken) {
                return next(new Error('Ошибка авторизации'));
            }
            return next(null, payload);
        } else {
            next(new Error('Пользователь не найден'));
        }
    }));

    app.use(passport.initialize());

    app.use("/api", authRoutes);
    app.use("/api/freelancers", freelancerRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/orders", orderRoutes);

    app.use(function (req, res, next) {
        const err = new Error('Ресурс не найден');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send({error: true, message: err.message});
    });

    app.listen(config.port, () =>
        console.log(`Сервер запущен`)
    );
})

