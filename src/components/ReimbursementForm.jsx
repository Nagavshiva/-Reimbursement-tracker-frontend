import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Button, Grid, Modal } from "@mui/material";
import { createNewReimbursement } from "../features/reducers/reimbursementSlice";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// eslint-disable-next-line react/prop-types
const ReimbursementForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    date: null,
    person: "",
    amount: "",
    invoiceId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewReimbursement(formData));
    history("/Dashboard");
    handleClose();
  };

  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          backgroundColor: "aliceblue",
          width: "500px",
          margin: "0 auto",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginBottom: "1rem",
              marginLeft: "1rem",
            }}
          >
            <Button onClick={handleClose}>X</Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  name="date"
                  value={formData.date}
                  onChange={handleDateChange}
                  renderInput={(props) => <TextField {...props} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Person"
                name="person"
                value={formData.person}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Invoice ID"
                name="invoiceId"
                value={formData.invoiceId}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default ReimbursementForm;
