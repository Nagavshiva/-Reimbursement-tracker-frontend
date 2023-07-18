import axios from 'axios';

const API_BASE_URL = 'https://reimbursement-tracker-backend.onrender.com'; 


export const createReimbursement = async (reimbursementData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/reimbursements/create`, reimbursementData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



export const getAllReimbursements = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reimbursements/`);
   return  response.data;
    // console.log('API Response: ', data);
  } catch (error) {
    console.error(error);
  }
};



export const approveReimbursement = async (reimbursementId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${reimbursementId}/api/reimbursements/approve`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



export const rejectReimbursement = async (reimbursementId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${reimbursementId}/reject`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
