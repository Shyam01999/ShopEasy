import { Box, Container, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Container
      maxWidth="xl"
      sx={{ background: "var(--footer-color)", color: "white" }}
    >
      <Box component="div" sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "var(--bg-color)" }}
        >
          © {new Date().getFullYear()} Shop Easy. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default Footer;
