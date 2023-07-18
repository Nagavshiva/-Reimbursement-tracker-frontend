import { Box,Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height:'100vh',
      position:'fixed',
      width:'100%',
      backgroundImage:'url(https://peoplehrindia.com/Images/feature/expense-claim.jpg)',
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover'
   
   }}>
    <Link to="/Dashboard">
      <Button sx={{backgroundColor:'#a83232',padding:'1rem',color:'#272b28'}}>
      Get Started
      </Button>
    </Link>
  </Box>
  )
}

export default Home;