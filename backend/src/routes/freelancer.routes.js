const express = require('express');
const FreelancerController = require("../controllers/freelancer.controller");
const Auth = require("../utils/common/auth");
const router = express.Router();

router.get('/', Auth.authenticate, FreelancerController.getFreelancers);
router.post('/', Auth.authenticate, FreelancerController.createFreelancer);
router.get('/:id', Auth.authenticate, FreelancerController.getFreelancer);
router.put('/:id', Auth.authenticate, FreelancerController.updateFreelancer);
router.delete('/:id', Auth.authenticate, FreelancerController.deleteFreelancer);

module.exports = router;