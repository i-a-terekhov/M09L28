const config = require("../src/config/config");

module.exports = {
    async up(db, client) {
        const users = await db.collection('users').find({}).toArray();
        const freelancers = await db.collection('freelancers').find({}).toArray();

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }

        const descriptions = [
            "Разработка интерактивного пользовательского интерфейса для социальной сети на React. Требуется создание адаптивных компонентов и интеграция с REST API.",
            "Анализ больших данных для оптимизации маркетинговых стратегий в ритейле. Необходимо применение машинного обучения для предсказания поведения покупателей и повышения конверсии.",
            "Настройка и оптимизация инфраструктуры для высоконагруженного облачного приложения. Важно обеспечить надежную работу сервиса с использованием Docker и Kubernetes.",
            "Разработка дизайна и пользовательского опыта для мобильного банкингового приложения. Основной акцент на простоте использования, безопасности и эстетической привлекательности.",
            "Разработка программного обеспечения для умного дома на базе микроконтроллеров. Требуется создание эффективного и надежного кода на C++ для управления различными устройствами.",
            "Проведение комплексного аудита безопасности для корпоративной сети банка. Необходим анализ уязвимостей и разработка рекомендаций по усилению защиты данных.",
            "Разработка и внедрение системы машинного обучения для автоматизации клиентского обслуживания в крупной розничной сети. Цель - повышение эффективности работы call-центра и улучшение клиентского опыта.",
            "Создание фронтенда для образовательной платформы на Angular. Важно обеспечить высокую производительность и отзывчивость интерфейса.",
            "Обновление и оптимизация серверной инфраструктуры для IT-стартапа. Требуется глубокое знание Linux и опыт работы с облачными сервисами.",
            "Разработка кросс-платформенного мобильного приложения для сервиса по доставке еды. Особое внимание уделить производительности и удобству пользовательского интерфейса на обеих платформах (iOS и Android)."
        ];

        const currentDate = new Date();

        const ordersData = [];
        for (let i = 0; i < descriptions.length; i++) {
            const deadline = randomDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1), new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1));
            const scheduled = randomDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

            const statuses = [config.orderStatuses.new, config.orderStatuses.confirmed, config.orderStatuses.success, config.orderStatuses.canceled];
            const status = statuses[getRandomInt(0, statuses.length - 1)];

            let complete = null;
            if (status === config.orderStatuses.success) {
                complete = randomDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), deadline);
            }

            ordersData.push({
                number: i + 1,
                description: descriptions[i],
                deadlineDate: deadline,
                scheduledDate: scheduled,
                owner: users[getRandomInt(0, users.length - 1)]['_id'],
                freelancer: freelancers[i]['_id'],
                status: status,
                completeDate: complete,
                amount: getRandomInt(300, 199000),
            });
        }

        ordersData.map((order) => {
            order.createdAt = currentDate;
            order.updatedAt = currentDate;
            return order;
        });

        await db.collection('orders').insertMany(ordersData);
    },

    async down(db, client) {

    }
};
