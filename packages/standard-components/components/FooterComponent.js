import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const FooterComponent = (props) => {
  const StyledLink = styled(Link)({
    color: blue[600],
    fontSize: "12px",
    margin: "0 10px",
  });
  return (
    <Box
      component="footer"
      sx={{
        gridArea: "footer",
        position: "fixed",
        bottom: 0,
        width: "100%",
        padding: "10px 0",
        borderTop: "1px solid #e0e0e0",
        fontSize: "12px",
        backgroundColor: "#ffffff",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Typography sx={{ fontSize: "12px", ml: "40px", pl: "30px" }}>
        Copyright &copy; 2024{" "}
        <Typography
          sx={{ fontSize: "12px" }}
          component="span"
          className="font-montserrat"
        >
          Integrated Workforce Solutions
        </Typography>
        . All rights reserved.
        <Typography component="span" className="sm-block">
          <StyledLink
            className="m-l-10 m-r-10"
            href="https://www.iwsaustralia.com.au/terms-of-service/"
            target="_blank"
          >
            Terms of use
          </StyledLink>{" "}
          <Typography
            sx={{ color: blue[600] }}
            component="span"
            className="muted"
          >
            |
          </Typography>{" "}
          <StyledLink
            className="m-l-10"
            href="https://www.iwsaustralia.com.au/privacy-policy/"
            target="_blank"
          >
            Privacy Policy
          </StyledLink>
        </Typography>
      </Typography>
    </Box>
  );
};

export default FooterComponent;
