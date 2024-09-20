const Ticket = require('../models/ticketModel');
const mongoose = require('mongoose');

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const ticket = new Ticket({ title, description });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: 'Server error: Unable to create ticket', error: error.message });
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find();
      const totalCount = await Ticket.countDocuments();  // Get the total count of tickets
      res.status(200).json({ totalCount, tickets });
    } catch (error) {
      res.status(500).json({ message: 'Server error: Unable to retrieve tickets', error: error.message });
    }
  };
  
// Get a single ticket by ID
const getTicketById = async (req, res) => {
  try {
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to retrieve ticket', error: error.message });
  }
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update ticket fields if provided
    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;

    // Validate status field if provided
    const validStatuses = ['open', 'in-progress', 'closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
    }

    ticket.status = status || ticket.status;
    ticket.updatedAt = Date.now();

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to update ticket', error: error.message });
  }
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
  try {
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to delete ticket', error: error.message });
  }
};

module.exports = {
     createTicket, 
    getAllTickets,
    getTicketById, 
    updateTicket, 
    deleteTicket 
};
