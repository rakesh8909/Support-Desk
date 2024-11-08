import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import tickerService from './ticketService';

const initialState = {
    tickets: [],
    ticket:{},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}



// create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    async(ticketData,thunkAPI)=>{
        //console.log(user)
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await tickerService.createTicket(ticketData,token);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    })

// get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll',
    async(_,thunkAPI)=>{
        //console.log(user)
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await tickerService.getTickets(token);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    })

// get user ticket
export const getTicket = createAsyncThunk(
    'tickets/get',
    async(ticketId,thunkAPI)=>{
        //console.log(user)
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await tickerService.getTicket(ticketId,token);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    })

// close ticket
export const closeTicket = createAsyncThunk(
    'tickets/close',
    async(ticketId,thunkAPI)=>{
        //console.log(user)
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await tickerService.closeTicket(ticketId,token);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    })




export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers:{
        reset: (state, action) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true

            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })
            .addCase(getTickets.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })
            .addCase(getTicket.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.tickets.map((ticket)=> ticket._id === action.payload._id ? (ticket.status = 'closed') : ticket)
            })
    }
})
export const {reset}= ticketSlice.actions;

export default ticketSlice.reducer