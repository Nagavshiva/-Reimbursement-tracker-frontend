import { configureStore } from '@reduxjs/toolkit';
import reimbursementReducer from './reducers/reimbursementSlice';

const store = configureStore({
  reducer: {
    reimbursement:reimbursementReducer,
  },
});

export default store;
