const { fetchTopUsers, fetchTopPosts } = require('../utils/service');

const getTopUsers = async (req, res) => {
  try {
    const result = await fetchTopUsers();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTopPosts = async (req, res) => {
  try {
    const type = req.query.type;
    if (!['latest', 'popular'].includes(type)) {
      return res.status(400).json({ error: 'Invalid type parameter' });
    }
    const result = await fetchTopPosts(type);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getTopUsers, getTopPosts };
