const userRepository = require("../repositories/user_repository");
const { db } = require("../common/functions");
const { createToken } = require("../common/functions");

function Resource() {
  this.login = login;

  this.getUsers = getUsers;
  this.addUser = addUser;
  this.editUser = editUser;
}

async function login(req, res, next) {
  try {
    const { password } = req.body;

    const result = await userRepository.queryUsers(req.body);

    if (result.length === 0) return res.status(401).json("auth/username-not-found");

    const user = result[0];

    if (user.password !== password) return res.status(401).json("auth/password-incorrect");

    delete user.username;
    delete user.password;

    const token = createToken(user);

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const result = await userRepository.queryUsers(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function addUser(req, res, next) {
  try {
    const { username } = req.body;

    let result = await userRepository.queryUsers({ username });

    if (result.length > 0) return res.status(403).json("user/username-already-exists");

    req.body.id = db.genID("USR");

    await userRepository.insertUser(req.body);

    result = await userRepository.queryUsers({ username });

    const user = result[0];

    delete user.username;
    delete user.password;

    const token = createToken(user);

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
}

async function editUser(req, res, next) {
  try {
    const { id } = req.body;

    if (!id) return res.status(403).json("user/id-not-found");

    delete req.body.username;

    await userRepository.updateUser(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
