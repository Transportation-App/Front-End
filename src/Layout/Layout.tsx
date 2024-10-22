import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton, Box, Typography } from "@mui/material";
import Icon from "../icons8-bus-office-m-96.png";  // Keep your icon here

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      {/* Navbar with increased height */}
      <AppBar position="static" sx={{ height: "80px", backgroundColor: "gray" }}>
        <Toolbar sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          {/* Logo and App Name next to each other */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            {/* Logo */}
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img src={Icon} alt="App Icon" style={{ height: "50px", width: "50px" }} />
            </IconButton>

            {/* App Name */}
            <Typography variant="h6" component="div" sx={{ ml: 0.5 }}>
              GoGo
            </Typography>

            {/* Buttons with space next to the app name */}
            <Box display="flex" alignItems="center" sx={{ ml: 6 }}>
              <Button color="inherit" component={NavLink} to="/itenarary">
                Εισιτήρια
              </Button>
              <Button color="inherit" component={NavLink} to="/info">
                Πληροφορίες
              </Button>
              <Button color="inherit" component={NavLink} to="/home">
                Δρομολόγια
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <main className="flex justify-center items-center min-h-[90vh] h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
