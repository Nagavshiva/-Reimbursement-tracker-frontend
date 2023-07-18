// import React from 'react';
import ReimbursementList from "../components/ReimbursementList";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Typography, Box } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const reimbursements = useSelector(
    (state) => state.reimbursement.reimbursements
  );
console.log(reimbursements)
  // Calculate data for the charts
  const totalAmountSpent = reimbursements.reduce(
    (total, reimbursement) => (reimbursement ? total + reimbursement.amount : total),
    0
  );
  

  
  const pendingAmount = reimbursements
  .filter((reimbursement) =>  reimbursement &&!reimbursement.approved)
  .reduce((total, reimbursement) => total + reimbursement.amount, 0);


  
const settledAmount = reimbursements
    .filter((reimbursement) => reimbursement && reimbursement.approved)
    .reduce((total, reimbursement) => total + reimbursement.amount, 0);
 
 
    const data = {
    labels: [
      "Total Amount Spent",
      "Pending Reimbursements",
      "Settled Reimbursements",
    ],
    datasets: [
      {
        label: "Reimbursement Statistics",
        data: [totalAmountSpent, pendingAmount, settledAmount],
        backgroundColor: ["#3f51b5", "#f44336", "#4caf50"],
      },
    ],
  };

  const PieChartData = {
    labels: [
      "Total Amount Spent",
      "Pending Reimbursements",
      "Settled Reimbursements",
    ],
    datasets: [
      {
        label: "Reimbursement Statistics",
        data: [totalAmountSpent, pendingAmount, settledAmount],
        backgroundColor: ["#3f51b5", "#f44336", "#4caf50"],
        fill: false,
      },
    ],
  };
  return (
    <Box style={{ width: "100%",marginTop:'4rem' }}>
      <Typography variant="h4">Dashboard</Typography>
      <ReimbursementList />
      <Box
        style={{
          height: "300px",
          display: "flex",
          gap: "3rem",
          alignitem: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Bar data={data} sx={{ width: "500px" }} />
        <Pie data={PieChartData} sx={{ width: "500px" }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
