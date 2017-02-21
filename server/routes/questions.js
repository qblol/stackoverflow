const express = require('express');
const router = express.Router();

const controllers = require('../controllers/questions');

router.get('/', controllers.getQuestions);
// router.get('/:id', controllers.getQuestion);
router.post('/', controllers.createQuestion);
// router.put('/:id', controllers.editQuestion);
// router.put('/:id/answer', controllers.answerQuestion);
// router.put('/:id/upvote', controllers.upvoteQuestion);
// router.put('/:id/downvote', controllers.downvoteQuestion);
// router.put('/:id/:answerid/upvote', controllers.upvoteAnswer;
// router.put('/:id/:answerid/downvote', controllers.downvoteAnswer;
// router.delete('/:id',controllers.deleteQuestion);

module.exports = router;
