const promisePool = require("../database/pool");
const { v4: uuidv4 } = require("uuid");

const addLike = ({ Id, postId, userId }) => {
  const sql_addlike = "UPDATE posts SET likes=likes+1 WHERE Id = ?";

  const sql_likes_users =
    "INSERT INTO likes_users SET Id=?, postId=?, userId=?";

  return promisePool
    .query(sql_addlike, [postId])
    .then(() => {
      return promisePool.query(sql_likes_users, [Id, postId, userId]);
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const subslike = ({ postId, userId }) => {
  const sql_addlike = "UPDATE posts SET likes=likes-1 WHERE Id = ?";

  const sql_likes_users = "DELETE FROM likes_users WHERE postId=? AND userId=?";

  return promisePool
    .query(sql_addlike, [postId])
    .then(() => {
      return promisePool.query(sql_likes_users, [postId, userId]);
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const createPost = (post) => {
  const sql =
    "INSERT INTO posts SET Id=?, description=?, rate=?, tags=?, likes=0, userId=?, date=NOW()";

  return promisePool
    .query(sql, post)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const get_like = (data) => {
  const sql = "SELECT * FROM likes_users WHERE postId=? AND userId=?";

  return promisePool
    .query(sql, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getFollowingPosts = (followerId) => {
  const sql =
    "SELECT p.Id, p.user, p.description, p.date, (SELECT u.name FROM users u where u.userId = p.user) as name FROM posts p WHERE user in((SELECT userId FROM users where userId = ?) UNION (SELECT followingId FROM follows WHERE followerId = ?)) ORDER BY date DESC";

  /* "SELECT p.Id, p.user, p.description, p.date, (SELECT u.name FROM users u where u.userId = p.user) as name FROM posts p WHERE user in(SELECT followingId FROM follows WHERE followerId = ?) ORDER BY date DESC"; */
  return promisePool
    .query("SET GLOBAL lc_time_names = 'es_MX'")
    .then(() => {
      return promisePool.query(sql, [followerId, followerId]);
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getMyPosts = (userId) => {
  const sql =
    "SELECT Id, description, tags, likes, rate, date, DATE_FORMAT(date, '%a %e %b %Y') AS date_public FROM posts WHERE userId = ? ORDER BY date DESC";

  return promisePool
    .query("SET @@lc_time_names = 'es_ES'")
    .then(() => {
      return promisePool.query(sql, [userId]);
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getOtherPosts = (userId) => {
  const sql =
    "SELECT p.Id, p.description, p.tags, p.likes, p.rate, p.userId, p.date, DATE_FORMAT(date, '%a %e %b %Y') AS date_public, u.name FROM posts p INNER JOIN users u ON p.userId = u.userId WHERE p.userId != ? ORDER BY date DESC";

  return promisePool
    .query("SET GLOBAL lc_time_names = 'es_MX'")
    .then(() => {
      return promisePool.query(sql, [userId]);
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const deletePost = (postId) => {
  const sql = "DELETE FROM posts WHERE Id = ?";

  return promisePool
    .query(sql, [postId])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const updatePost = (postData) => {
  const sql = "UPDATE posts SET description = ? WHERE Id = ?";

  return promisePool
    .query(sql, postData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  addLike,
  subslike,
  createPost,
  get_like,
  getFollowingPosts,
  getMyPosts,
  getOtherPosts,
  deletePost,
  updatePost,
};
