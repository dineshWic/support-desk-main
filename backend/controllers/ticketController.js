const asyncHandler = require('express-async-handler');
const convertPdfToImages = require('../middleware/convertPdfToImagesMiddleware');
const { uploadFileToFirebase } = require('../config/firebase');

const path = require('path');

const Ticket = require('../models/ticketModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
  

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // console.log(ticket.paper) =  uploads\images\776cedd5-2761-4e7e-95d1-7f372f5f5b82.pdf 
  // const parentDir = path.dirname(path.dirname(__dirname));
  // console.log(parentDir); "D:\Code Test\Mern\support-desk-main\support-desk-main"

  
  const parentDir = path.dirname(path.dirname(__dirname));
  ticketPaperJoin = path.join(parentDir, ticket.paper);
  ticketMarkingSchemeJoin = path.join(parentDir, ticket.markingScheme);

  ticket.paper = `http://localhost:3000/${ticketPaperJoin}`;
  ticket.markingScheme = `http://localhost:3000/${ticketMarkingSchemeJoin}`;

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  // console.log(ticket.paper)
  // console.log(ticket.markingScheme)
  res.status(200).json(ticket)
})

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  console.log(req)
  const { description } = req.body;
  const paperFile = req.files['paper'][0];
  const markingSchemeFile = req.files['markingScheme'][0];

  if (!paperFile || !description || !markingSchemeFile) {
    res.status(400);
    throw new Error('Please add documents (pdf) and description');
  }
  // console.log("This is file paths",paperFile.path);
  // console.log("This is file paths", markingSchemeFile.path);

  try {
    const paperDownloadURL = await uploadFileToFirebase(paperFile);
    const markingSchemeDownloadURL = await uploadFileToFirebase(markingSchemeFile);

    // console.log("Files uploaded successfully");


    const ticket = new Ticket({
      user: req.user._id,
      description,
      paper: paperDownloadURL,
      markingScheme: markingSchemeDownloadURL,
      status: 'new',
    });

    await ticket.save();

    res.status(201).json(ticket);

  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.remove()

  res.status(200).json({ success: true })
})

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
