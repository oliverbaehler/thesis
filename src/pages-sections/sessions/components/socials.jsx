import { Fragment } from "react";
import GoogleSignIn from "./google"; 
import InstagramSignIn from "./instagram"; 

export default function SocialSignIn(props) {
  return (
    <Fragment>
      <InstagramSignIn />
      <GoogleSignIn />
    </Fragment>
  );
}