const postPool = require("../helpers/postPool");
const { verifyToken } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");

const createPost = (body, userId) => {
  console.log(body, userId);
  const Id = uuidv4();
  const postData = [Id, body.description, userId];

  //Crea un usuario al registrase

  return postPool
    .createPost(postData)
    .then((response) => {
      return { status: 201, msg: "todo bien" };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  createPost,
};
