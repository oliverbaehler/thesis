"use client";

import { signOut } from 'next-auth/react';
import { Button, Container, Typography, Box } from '@mui/material';

export default function LogoutPageView() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Are you sure you want to log out?
      </Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Yes, Logout
        </Button>
      </Box>
    </Container>
  );
}