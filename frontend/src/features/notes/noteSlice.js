import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import noteService from "./noteService";
import {getTicket} from "../tickets/ticketSlice";

const initialState = {
    notes:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}



// get  ticket notes
export const getNotes = createAsyncThunk(
    'notes/getAll',
    async(ticketId,thunkAPI)=>{
        //console.log(user)
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.getNotes(ticketId,token);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    })

// create a  ticket note
export const createNote = createAsyncThunk(
    'notes/create',
    async({noteText,ticketId},thunkAPI)=>{
        //console.log(user)
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.createNote(noteText,ticketId,token);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    })








export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        reset: (state, action) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })
            .addCase(createNote.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes.push(action.payload)
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })

    }
})

export const {reset} = noteSlice.actions;

export default noteSlice.reducer;