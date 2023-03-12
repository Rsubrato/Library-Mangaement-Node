const { Router } = require('express');
const { requireAuth} = require('../middleware/authMiddleware');
const studentController=require('../controllers/studentController');

const router=Router();

router.get('/books',requireAuth,studentController.restrict_student,studentController.student_books_get);
router.post('/request/:id',requireAuth,studentController.restrict_student,studentController.student_post_request);
router.post('/return/:id',requireAuth,studentController.restrict_student,studentController.student_post_return);

module.exports=router;
