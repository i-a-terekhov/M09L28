const crypto = require("crypto");
module.exports = {
    async up(db, client) {
        let users = [
            {name: "Екатерина", lastName: "Иванова", email: "ekaterina.ivanova@gmail.com", password: "Ek4tIv#702"},
            {name: "Дмитрий", lastName: "Петров", email: "dmitry.petrov@gmail.com", password: "Dm3tPv#513"},
        ];

        users = users.map(item => {
            const salt = crypto.randomBytes(128).toString('base64');
            const passwordHash = crypto.pbkdf2Sync(item.password, salt, 1, 128, 'sha1').toString('base64');

            item.salt = salt;
            item.passwordHash = passwordHash;
            delete item.password;

            return item;
        })

        await db.collection('users').insertMany(users);
    },

    async down(db, client) {
        // В случае отката удаляем добавленных пользователей
        await db.collection('users').deleteMany({
            email: {$in: ["ekaterina.ivanova@gmail.com", "dmitry.petrov@gmail.com", "olga.smirnova@gmail.com", "aleksey.kuznetsov@gmail.com", "maria.vasilieva@gmail.com"]}
        });
    }
};
