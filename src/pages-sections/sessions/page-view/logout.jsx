"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container, Typography, Box } from '@mui/material';


export default function LogoutPageView() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Are you sure you want to log out?
      </Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
        >
          Yes, Logout
        </Button>
      </Box>
    </Container>
  );
}