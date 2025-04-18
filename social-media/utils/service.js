const axios = require('axios');
const BASE_URL = 'http://20.244.56.146/evaluation-service';

const fetchTopUsers = async () => {
  const usersRes = await axios.get(`${BASE_URL}/users`);
  const users = usersRes.data.users;

  const userComments = [];

  for (const user of users) {
    const postsRes = await axios.get(`${BASE_URL}/posts?userId=${user.id}`);
    const posts = postsRes.data.posts || [];

    let commentCount = 0;
    for (const post of posts) {
      commentCount += (post.comments || []).length;
    }

    userComments.push({ user, totalComments: commentCount });
  }

  userComments.sort((a, b) => b.totalComments - a.totalComments);

  return userComments.slice(0, 5).map(({ user, totalComments }) => ({
    id: user.id,
    name: user.name,
    totalComments,
  }));
};

const fetchTopPosts = async (type) => {
  const postsRes = await axios.get(`${BASE_URL}/posts`);
  const posts = postsRes.data.posts || [];

  if (type === 'popular') {
    posts.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
  } else {
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return posts.slice(0, 5);
};

module.exports = { fetchTopUsers, fetchTopPosts };
