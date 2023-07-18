import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createReimbursement, getAllReimbursements, approveReimbursement, rejectReimbursement } from './reimbursementsApi';

const initialState = {
  reimbursements:JSON.parse(localStorage.getItem('reimbursements')) ||[],
  status: 'idle',
  error: null,
};

export const fetchReimbursements = createAsyncThunk(
  'reimbursement/fetchReimbursements',
  async () => {
    try {
      const response = await getAllReimbursements();
      console.log('API Response: ', response); 
     return  response;
    } catch (error) {
      throw new Error('Failed to fetch reimbursements');
    }
  }
);

export const createNewReimbursement = createAsyncThunk(
  'reimbursement/createNewReimbursement',
  async (reimbursementData) => {
    try {
      const response = await createReimbursement(reimbursementData);
      return response;
    } catch (error) {
      throw new Error('Failed to create a new reimbursement');
    }
  }
);

export const approveExistingReimbursement = createAsyncThunk(
  'reimbursement/approveExistingReimbursement',
  async (reimbursementId) => {
    try {
      const response = await approveReimbursement(reimbursementId);
      return response;
    } catch (error) {
      throw new Error('Failed to approve the reimbursement');
    }
  }
);

export const rejectExistingReimbursement = createAsyncThunk(
  'reimbursement/rejectExistingReimbursement',
  async (reimbursementId) => {
    try {
      const response = await rejectReimbursement(reimbursementId);
      return response;
    } catch (error) {
      throw new Error('Failed to reject the reimbursement');
    }
  }
);

const reimbursementSlice = createSlice({
  name: 'reimbursement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReimbursements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReimbursements.fulfilled, (state, action) => {
        console.log('Fulfilled: ', action.payload);
        state.status = 'succeeded';
        state.reimbursements = action.payload;
      })
      .addCase(fetchReimbursements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewReimbursement.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reimbursements.push(action.payload);
      })
      .addCase(createNewReimbursement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(approveExistingReimbursement.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedReimbursements = state.reimbursements.map((reimbursement) => {
          if (!reimbursement || !reimbursement._id) {
            return reimbursement; // Return the reimbursement object as is
          }
      
          if (reimbursement._id === action.payload?._id) {
            return { ...reimbursement, approved: true };
          } else {
            return reimbursement;
          }
        });
        state.reimbursements = updatedReimbursements;
    
      })
      .addCase(approveExistingReimbursement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(rejectExistingReimbursement.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedReimbursements = state.reimbursements.map((reimbursement) => {
          if (!reimbursement || !reimbursement._id) {
            return reimbursement; // Return the reimbursement object as is
          }

          return reimbursement._id === action.payload._id
            ? { ...reimbursement, approved: false, rejected: true }
            : reimbursement;
        });
        state.reimbursements = updatedReimbursements.filter((reimbursement) => reimbursement);
        localStorage.setItem('reimbursements', JSON.stringify(state.reimbursements));
      })
      .addCase(rejectExistingReimbursement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reimbursementSlice.reducer;
