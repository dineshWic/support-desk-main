const express = require('express')
const router = express.Router()


const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')
const fileUpload = require('../middleware/fileUploadMiddleware');


// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

// const upload = fileUpload.single('image');

// router
//   .route('/')
//   .get(protect, getTickets)
//   .post(protect, createTicket);
router
  .route('/')
  .get(protect, getTickets)
  .post(
    protect,
    fileUpload.fields([
      { name: 'paper', maxCount: 1 },
      { name: 'markingScheme', maxCount: 1 }
    ]),
    createTicket
  );

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)

module.exports = router
