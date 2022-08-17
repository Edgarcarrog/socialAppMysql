const followPool = require("../helpers/followPool");
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

  try {
    const { follower, following } = query;
    return { status: 200, msg: "Bienvenido", data: { follower, following } };
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

module.exports = {
  createFollow,
};
