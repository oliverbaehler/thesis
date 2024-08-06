"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled"; 
// LOCAL CUSTOM COMPONENTS

import ProductReview from "./product-review";
import ProductDescription from "./product-description"; 
// STYLED COMPONENT

const StyledTabs = styled(Tabs)(({
  theme
}) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize"
  }
}));
export default function ProductTabs({ description }) {
  const [selectedOption, setSelectedOption] = useState(0);
  return <>
      <StyledTabs textColor="primary" value={selectedOption} indicatorColor="primary">
        <Tab className="inner-tab" label="Description" />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && <ProductDescription description={description}/>}
      </Box>
    </>;
}