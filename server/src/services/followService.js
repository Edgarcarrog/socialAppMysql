const followPool = require("../helpers/followPool");
const { verifyToken } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");

const createFollow = (query) => {
  const { followerId, followingId } = query;
  const Id = uuidv4();
  const followData = [Id, followerId, followingId];

  //Crea un usuario al registrase

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

const getFollowing = (user) => {
  const { payload } = verifyToken(user);
  console.log("El payload es", payload);

  return followPool
    .getFollowing(payload)
    .then((response) => {
      const [data] = response;
      console.log(data);
      return { status: 200, msg: response.message, data: data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  createFollow,
  getFollowing,
};
