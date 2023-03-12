const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const adminController=require('../controllers/adminController');

const router=Router();

router.get('/users',requireAuth,adminController.restrict_admin,adminController.users_get);
router.post('/create',requireAuth,adminController.restrict_admin,adminController.users_post);
router.get('/create',requireAuth,adminController.restrict_admin,adminController.user_add);
router.get('/add',requireAuth,adminController.restrict_admin,adminController.books_create);
router.post('/add',requireAuth,adminController.restrict_admin,adminController.books_post);
router.get('/books',requireAuth,adminController.restrict_admin,adminController.books_get);
router.get('/books/:id',requireAuth,adminController.restrict_admin,adminController.book_get_id);
router.get('/books/delete/:id',requireAuth,adminController.restrict_admin,adminController.book_delete_id);
router.get('/users/delete/:id',requireAuth,adminController.restrict_admin,adminController.user_delete_id);
router.post('/users/update/:id',requireAuth,adminController.restrict_admin, adminController.user_update);
router.get('/users/update/:id',requireAuth,adminController.restrict_admin,adminController.view_updated_users);
router.get('/books/update/:id',requireAuth,adminController.restrict_admin,adminController.view_updated_books);
router.post('/books/update/:id',requireAuth,adminController.restrict_admin, adminController.book_update);

module.exports=router;

