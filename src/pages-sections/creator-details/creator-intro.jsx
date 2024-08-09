import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonOutline from "@mui/icons-material/PersonOutline"; // Import the fallback icon


export default function ProfileView({ user }) {
  return (
    <Box width="100%">
      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '50vh' }} // Ensures the content is centered vertically
      >
        <Grid item>
        {user.photoURL ? (
            <Avatar
              alt="Profile Picture"
              src={user.photoURL}
              sx={{ width: 200, height: 200 }} // Large avatar size
            />
          ) : (
            <PersonOutline sx={{ fontSize: 200, color: "gray" }} />
          )}
        </Grid>
        <Grid item>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {user.displayName}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}