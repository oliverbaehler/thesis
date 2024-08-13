import Link from "next/link";
import FlexBox from "components/flex-box/flex-box"; 

import Globe from "icons/Globe";
import AccountPopover from "./account-popover";
import NotificationsPopover from "./notification-popover"; 
import { CustomButton, ToggleWrapper } from "./styles";

export default function RightContent() {
  return <FlexBox alignItems="center" gap={2}>
      <NotificationsPopover />

      <CustomButton LinkComponent={Link} href="/" startIcon={<Globe sx={{
      color: "grey.900"
    }} />}>
        Browse Website
      </CustomButton>

    </FlexBox>;
}