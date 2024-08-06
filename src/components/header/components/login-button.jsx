import IconButton from "@mui/material/IconButton"; 
import PersonOutline from "@mui/icons-material/PersonOutline"; 

import { useAuth } from "contexts/SessionContext";

import Globe from "icons/Globe";
import LoginIcon from '@mui/icons-material/Login';

import { CustomButton, ToggleWrapper } from "./styles";

export default function LoginCartButtons({
  toggleDialog,
}) {
  const { user } = useAuth();
  const ICON_COLOR = {
    color: "grey.600"
  };

  return <div>
      {!user ? (
        <CustomButton href="/dashboard" startIcon={<Globe sx={{
          color: "grey.900"
        }} />}>
            Dashboard
        </CustomButton>
      ) : (
        <CustomButton onClick={toggleDialog} startIcon={<LoginIcon sx={{
          color: "grey.900"
        }} />}>
            Login
        </CustomButton>
      )}
        <IconButton onClick={toggleDialog}>
          {/* You could show a user avatar or some other icon here */}
          <PersonOutline sx={{ ...ICON_COLOR, color: "blue" }} /> {/* Example: Change color or show different icon */}
        </IconButton>


    </div>;
}