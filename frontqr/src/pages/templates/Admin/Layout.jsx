import React from 'react';
import Box from '@mui/material/Box';
import MiniDrawer from './Drawer';
import Footer from './Footer';

export default function LayoutAdmin({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, background: "#f2f2f2", marginTop: "65px" }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
