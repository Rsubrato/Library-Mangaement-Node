const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const lecturerController=require('../controllers/lecturerController');

const router=Router();

router.get('/books',requireAuth,lecturerController.restrict_lecturer,lecturerController.lecturer_books_get);
router.get('/approve',requireAuth,lecturerController.restrict_lecturer,lecturerController.approve_get);
router.post('/approve/:id',requireAuth,lecturerController.restrict_lecturer,lecturerController.approve_post);
router.post('/reject/:id',requireAuth,lecturerController.restrict_lecturer,lecturerController.reject_post);

module.exports=router;

