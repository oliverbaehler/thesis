import React from 'react';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';

import instagramLogo from '../../../../public/assets/images/icons/instagram.svg';


const InstagramSignIn = () => {
  return (
    <Button
      onClick={() => signIn('instagram')}
      fullWidth
      size="large"
      className="instagramButton"
      sx={{ fontSize: 12 }}
    >
      Continue with Instagram
    </Button>
  );
};

export default InstagramSignIn;