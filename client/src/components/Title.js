import React from "react";
import { styled, Typography } from "@mui/material";

const StyledTypography = styled(Typography)({
  fontWeight: 500,
  marginBottom: "0.5rem",
});

const Title = ({ title }) => {
  return (
    <StyledTypography variant="h5" component="h2">
      {title}
    </StyledTypography>
  );
};

export default Title;
