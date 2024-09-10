"use client";

import { alpha, styled } from "@mui/material/styles";
import SimpleBar from "simplebar-react";

/**
 * Styled component for a custom scroll bar using `SimpleBar` and MUI's styling utilities.
 * The scroll bar's appearance is customized, including colors, opacity, and size for both 
 * vertical and horizontal tracks.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StyledScrollBar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&.simplebar-visible:before": {
      opacity: 1
    },
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[400], 0.6)
    }
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 9
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6
  },
  "& .simplebar-mask": {
    zIndex: "inherit"
  }
}));
