const express = require('express');
const { joinMembership, getAllMembers } = require('../controllers/memberController');
const router = express.Router();

router.post('/join', joinMembership);
router.get('/all', getAllMembers);

module.exports = router;
