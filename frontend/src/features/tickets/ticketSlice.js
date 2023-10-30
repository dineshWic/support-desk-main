import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../utils'

// NOTE: no need for isLoading, isSuccess, isError or message as we can leverage
// our AsyncThunkAction and get Promise reolved or rejected messages at
// component level
const initialState = {
  tickets: null,
  ticket: null,
  error: null,
  loading: false,
}

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      console.log("This is data", ticketData );
      const token = thunkAPI.getState().auth.user.token
      const response = await ticketService.createTicket(ticketData, token);

      response.paper = `${response.paper.replace(/\\/g, '/')}`;
      response.markingScheme = `${response.markingScheme.replace(/\\/g, '/')}`;
      
      // console.log(response.paper, response.markingScheme);
      

      return response;

    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // return await ticketService.getTicket(ticketId, token)

      const response = await ticketService.getTicket(ticketId, token);

      // Update the response data to include the file URLs
      // console.log(window.location.origin) = 'http://localhost:3000'
      response.paper = `${response.paper.replace(/\\/g, '/')}`;
      response.markingScheme = `${response.markingScheme.replace(/\\/g, '/')}`;
      

      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// NOTE: removed loading, isSuccess state as it can be infered from presence or
// absence of tickets for simpler state management with no need for a reset
// function

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        // NOTE: clear single ticket on tickets page, this replaces need for
        // loading state on individual ticket
        state.ticket = null
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticket = action.payload
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.ticket = action.payload
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        )
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export default ticketSlice.reducer
