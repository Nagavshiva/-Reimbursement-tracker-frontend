import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import ReimbursementForm from "../components/ReimbursementForm";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <AppBar sx={{backgroundColor:'#6b738cs'}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={{ cursor: "pointer", color: "white" }}>
            Reimbursement tracker
            </Typography>
          </Link>
          <Typography onClick={handleOpen} sx={{ cursor: "pointer" }}>
            Reimbursement Form
          </Typography>
          <Link to="/Dashboard" style={{ textDecoration: "none" }}>
            <Typography sx={{ cursor: "pointer", color: "white" }}>
              Dashboard
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      {open && (
        <ReimbursementForm
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};

export default Navbar;
