const postPool = require("../helpers/postPool");
const { verifyToken } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");

const addLike = ({ postId, token }) => {
  //Agrega un like del usuario
  const Id = uuidv4();
  const userId = verifyToken(token);
  return postPool
    .addLike({ Id, postId, userId })
    .then((response) => {
      return { status: 201, msg: "todo bien" };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const subslike = ({ postId, token }) => {
  //Agrega un like del usuario
  const userId = verifyToken(token);
  return postPool
    .subslike({ postId, userId })
    .then((response) => {
      return { status: 201, msg: "todo bien" };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const get_like = ({ postId, token }) => {
  //Agrega un like del usuario
  const userId = verifyToken(token);
  return postPool
    .get_like([postId, userId])
    .then((response) => {
      const [data] = response;
      return { status: 200, msg: response.message, data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const createPost = (body, userId) => {
  const Id = uuidv4();
  const {title, description, rate, tags} = body;
  const post = [Id, title, description, rate, tags, userId];

  //Crea un post del usuario loggeado
  return postPool
    .createPost(post)
    .then(() => {
      return { status: 201, msg: "todo bien" };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getFollowingPosts = (userId) => {
  //Obtiene los Posts de los usuarios a los que seguimos
  return postPool
    .getFollowingPosts(userId)
    .then((response) => {
      const [data] = response;
      return { status: 200, msg: response.message, data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getMyPosts = (token) => {
  //Obtiene los Posts del usuario loggeado
  const userId = verifyToken(token);
  return postPool
    .getMyPosts(userId)
    .then((response) => {
      const [data] = response;
      return { status: 200, msg: response.message, data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getOtherPosts = (token) => {
  //Obtiene los Posts de los usuarios a los que seguimos
  const id = verifyToken(token);
  return postPool
    .getOtherPosts(id)
    .then((response) => {
      const [data] = response;
      return { status: 200, msg: response.message, data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const deletePost = (postId) => {
  //Obtiene los Posts de los usuarios a los que seguimos
  return postPool
    .deletePost(postId)
    .then((response) => {
      return { status: 200, msg: response.message };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const updatePost = (body, postId) => {
  const postData = [body.description, postId];

  //Crea un usuario al registrase

  return postPool
    .updatePost(postData)
    .then(() => {
      return { status: 201, msg: "Post actualizado" };
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
