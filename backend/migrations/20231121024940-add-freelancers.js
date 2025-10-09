const config = require("../src/config/config");

module.exports = {
    async up(db, client) {
        const freelancers = [
            {
                name: "Иван",
                lastName: "Иванов",
                avatar: "1.jpg",
                email: "ivan.ivanov@example.com",
                education: "Бакалавр информатики",
                location: "Москва, Россия",
                skills: "JavaScript, React",
                info: "Разработчик JavaScript с опытом работы 2 года, специализирующийся на React и фронтенд разработке.",
                level: config.freelancerLevels.junior
            },
            {
                name: "Мария",
                lastName: "Петрова",
                avatar: "5.jpg",
                email: "maria.petrova@example.com",
                education: "Магистр компьютерных наук",
                location: "Минск, Беларусь",
                skills: "Python, Data Science",
                info: "Специалист по Data Science с 3-летним опытом, владеющий Python, анализом данных и машинным обучением.",
                level: config.freelancerLevels.middle
            },
            {
                name: "Алексей",
                lastName: "Смирнов",
                avatar: "3.jpg",
                email: "aleksey.smirnov@example.com",
                education: "Специалист по информационным системам",
                location: "Новосибирск, Россия",
                skills: "DevOps, Docker, Kubernetes",
                info: "DevOps инженер с 5-летним опытом работы, специализирующийся на Docker и Kubernetes.",
                level: config.freelancerLevels.senior
            },
            {
                name: "Елена",
                lastName: "Воронова",
                avatar: "4.jpg",
                email: "elena.voronova@example.com",
                education: "Магистр веб-дизайна",
                location: "Казань, Россия",
                skills: "UI/UX, Graphic Design",
                info: "UI/UX дизайнер с опытом работы 4 года, занимающаяся созданием пользовательских интерфейсов и графическим дизайном.",
                level: config.freelancerLevels.middle
            },
            {
                name: "Сергей",
                lastName: "Николаев",
                avatar: "2.jpg",
                email: "sergey.nikolaev@example.com",
                education: "Бакалавр прикладной информатики",
                location: "Екатеринбург, Россия",
                skills: "C++, Embedded Systems",
                info: "Разработчик встроенных систем с опытом работы 6 лет, специализирующийся на C++ и микроконтроллерах.",
                level: config.freelancerLevels.senior
            },
            {
                name: "Анна",
                lastName: "Орлова",
                avatar: "9.jpg",
                email: "anna.orlova@example.com",
                education: "Специалист по кибербезопасности",
                location: "Владивосток, Россия",
                skills: "Cybersecurity, Network Security",
                info: "Эксперт по кибербезопасности с 7-летним опытом в области защиты сетевых систем и данных.",
                level: config.freelancerLevels.senior
            },
            {
                name: "Дмитрий",
                lastName: "Кузнецов",
                avatar: "7.jpg",
                email: "dmitry.kuznetsov@example.com",
                education: "Магистр искусственного интеллекта",
                location: "Сочи, Россия",
                skills: "AI, Machine Learning",
                info: "Специалист по искусственному интеллекту с опытом разработки машинного обучения и нейросетей.",
                level: config.freelancerLevels.middle
            },
            {
                name: "Дмитрий",
                lastName: "Хорошев",
                avatar: "8.jpg",
                email: "dmitri.horoshev@example.com",
                education: "Бакалавр информационных технологий",
                location: "Пермь, Россия",
                skills: "Frontend Development, Angular",
                info: "Фронтенд разработчик с опытом создания веб-приложений на Angular и современных технологиях веб-разработки.",
                level: config.freelancerLevels.junior
            },
            {
                name: "Виктор",
                lastName: "Морозов",
                avatar: "6.jpg",
                email: "viktor.morozov@example.com",
                education: "Специалист по компьютерным системам",
                location: "Минск, Беларусь",
                skills: "System Administration, Linux",
                info: "Системный администратор с опытом управления и поддержки компьютерных систем на базе Linux.",
                level: config.freelancerLevels.middle
            },
            {
                name: "Роман",
                lastName: "Андросов",
                avatar: "10.jpg",
                email: "roman.androsov@example.com",
                education: "Специалист по мобильной разработке",
                location: "Красноярск, Россия",
                skills: "Mobile Development, iOS, Android",
                info: "Мобильный разработчик с опытом создания приложений для iOS и Android, владеющий Swift и Kotlin.",
                level: config.freelancerLevels.junior
            }
        ];

        const currentDate = new Date();
        freelancers.map((freelancer) => {
            freelancer.createdAt = currentDate;
            freelancer.updatedAt = currentDate;

            return freelancer;
        });

        await db.collection('freelancers').insertMany(freelancers);
    },

    async down(db, client) {

    }
};
