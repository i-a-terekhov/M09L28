const BaseNormalizer = require("./base.normalizer");
const config = require("../config/config");

class FreelancerNormalizer extends BaseNormalizer {
    static normalize(freelancer, needFull = true) {
        let obj = {
            id: freelancer.id,
            name: freelancer.name,
            lastName: freelancer.lastName,
        };

        if (needFull) {
            obj = {
               ...obj,
                email: freelancer.email,
                avatar: freelancer.avatar ? config.freelancerAvatarsPath + freelancer.avatar : config.defaultFreelancerAvatar,
                level: freelancer.level,
                education: freelancer.education,
                location: freelancer.location,
                skills: freelancer.skills,
                info: freelancer.info,
                createdAt: freelancer.createdAt,
                updatedAt: freelancer.updatedAt,
            };
        }

        return obj;
    }
}

module.exports = FreelancerNormalizer;