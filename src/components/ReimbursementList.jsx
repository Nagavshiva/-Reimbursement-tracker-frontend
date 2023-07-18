import { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveExistingReimbursement,
  rejectExistingReimbursement,
  fetchReimbursements
} from "../features/reducers/reimbursementSlice";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  Box,
  Paper,
  TableContainer,
} from "@mui/material";

const ReimbursementList = () => {
  const dispatch = useDispatch();
  const reimbursements = useSelector(
    (state) => state.reimbursement.reimbursements
  );

  const [searchTerm, setSearchTerm] = useState("");


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchReimbursements());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveExistingReimbursement(id));
  };

  const handleReject = (id) => {
    dispatch(rejectExistingReimbursement(id));
  };

  const filteredReimbursements = reimbursements.filter((reimbursement) => {
    if (!reimbursement) return false; // Skip null or undefined reimbursements

    const { type, person } = reimbursement || {}; // Provide a fallback object in case of null reimbursement

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      type.toLowerCase().includes(lowerCaseSearchTerm) ||
      person.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <TextField
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <Paper sx={{ overflow: "hidden", marginTop: "1rem" }}>
        <TableContainer sx={{ maxHeight: 240 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ width: "80%", margin: "0 auto" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Person</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{}}>
              {filteredReimbursements.map((reimbursement) => (
                <TableRow key={reimbursement._id}>
                  <TableCell>{reimbursement.type}</TableCell>
                  <TableCell>
                    {reimbursement.date.substring(0, 10)}
                  </TableCell>
                  <TableCell>{reimbursement.person}</TableCell>
                  <TableCell>{reimbursement.amount}</TableCell>
                  <TableCell>
                    {!reimbursement.approved && !reimbursement.rejected ? (
                      <>
                        <Button
                          onClick={() => handleApprove(reimbursement._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(reimbursement._id)}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            backgroundColor: reimbursement.approved
                              ? "green"
                              : "red",
                            color: "white",
                          }}
                        >
                          {reimbursement.approved ? "Approved" : "Rejected"}
                        </span>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ReimbursementList;
