const express = require('express');
const { getTopUsers, getTopPosts } = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/top-users', getTopUsers);
router.get('/posts', getTopPosts);

module.exports = router;
