const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    //get user using the id and jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found");
    }
    const ticket = await Ticket.find({user: req.user.id});
    res.status(200).json(ticket);
})


// @desc Get user ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
    //get user using the id and jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found");
    }
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        res.status(404)
        throw new Error("Ticket not Found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized");
    }


    res.status(200).json(ticket);
})


// @desc delete user ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
    //get user using the id and jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found");
    }
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        res.status(404)
        throw new Error("Ticket not Found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized");
    }
    await ticket.deleteOne() ;


    res.status(200).json({
        success: true
    });
})

// @desc update user ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
    //get user using the id and jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found");
    }
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        res.status(404)
        throw new Error("Ticket not Found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true});


    res.status(200).json(updatedTicket);
})


// @desc create a new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if(!product || !description){
        res.status(400)
        throw new Error("Please add a product and description");
    }

    //get user using the id and jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401)
        throw new Error("User not found");
    }
    const ticket = await Ticket.create({
        product: product,
        description: description,
        user: req.user.id,
        status: 'new'
    })
    res.status(201).json(ticket)
})

module.exports={
    getTickets,
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket
}

