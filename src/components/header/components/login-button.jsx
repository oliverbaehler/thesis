import IconButton from "@mui/material/IconButton"; 
import PersonOutline from "@mui/icons-material/PersonOutline"; 
import { useRouter } from "next/navigation";
import { useAuth } from "contexts/SessionContext";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



import Globe from "icons/Globe";
import LoginIcon from '@mui/icons-material/Login';

import { CustomButton, ToggleWrapper } from "./styles";

export default function LoginCartButtons({
  toggleDialog,
}) {
  const router = useRouter();
  const { user } = useAuth();
  const ICON_COLOR = {
    color: "grey.600"
  };

  const handleRedirect = () => {
    router.push(`/creator/${user.uid}`);
  };

  return <div>
      {user ? (
        <>
          <CustomButton href="/dashboard" className="dashboard-btn" startIcon={<Globe sx={{ color: "grey.900" }} />}>
            Dashboard
          </CustomButton>
          <IconButton onClick={handleRedirect}>
           {user.photoURL ? (
            <Avatar alt="User Avatar" src={user.photoURL} />
           ) : (
            <PersonOutline sx={{ ...ICON_COLOR, color: "gray" }} />
           )}
          </IconButton>
        </>
      ) : (
        <CustomButton onClick={toggleDialog} className="login-btn" startIcon={<LoginIcon sx={{
          color: "grey.900"
        }} />}>
            Login
        </CustomButton>
      )}
    </div>;
}