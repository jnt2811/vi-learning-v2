const router = require("express").Router();

const userResource = require("../resources/user_resource");

router.post("/api/public/user/login", userResource.login);
router.post("/api/resources/user/get_users", userResource.getUsers);
router.post("/api/resources/user/add_user", userResource.addUser);
router.post("/api/resources/user/edit_user", userResource.editUser);

module.exports = router;
