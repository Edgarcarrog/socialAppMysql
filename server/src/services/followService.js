const followPool = require("../helpers/followPool");
const { verifyToken } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");

const createFollow = (query) => {
  const { user, followingId } = query;
  const Id = uuidv4();
  const followData = [Id, user, followingId];

  //Crea un seguimiento entre usuarios
  return followPool
    .createFollow(followData)
    .then((response) => {
      return { status: 201, msg: response };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getFollowers = (token) => {
  const payload = verifyToken(token);

  return followPool
    .getFollowers(payload)
    .then((response) => {
      const [data] = response;
      return { status: 200, msg: response.message, data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getFollowing = (token) => {
  const payload = verifyToken(token);

  return followPool
    .getFollowing(payload)
    .then((response) => {
      const [data] = response;
      return { status: 200, msg: response.message, data: data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const deleteFollow = (query) => {
  const { user, followingId } = query;
  const { payload } = verifyToken(user);

  return followPool
    .deleteFollow(payload, followingId)
    .then((response) => {
      return { status: 200, msg: response.message };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  createFollow,
  getFollowers,
  getFollowing,
  deleteFollow,
};
