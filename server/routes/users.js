const express = require('express');
const router = express.Router();

const controllers = require('../controllers/users');

router.get('/', controllers.getUsers);
router.get('/:username', controllers.getUser);
router.post('/', controllers.createUser);
router.post('/login', controllers.login);
router.put('/:username', controllers.editUser);
router.delete('/:username',controllers.deleteUser);

module.exports = router;
