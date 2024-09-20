const express = require('express');
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

// Ticket routes
router.post('/create-tickets', createTicket);
router.get('/getAll-tickets', getAllTickets);
router.get('/single-tickets/:id', getTicketById);
router.put('/update-tickets/:id', updateTicket);
router.delete('/delete-tickets/:id', deleteTicket);

module.exports = router;
