import { useRouteError } from "react-router-dom";
import React from "react";
import { Container, Typography } from "@mui/material";
const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container id="error-page">
      <Typography variant="h1">Oops!</Typography>
      <Typography>Sorry, an unexpected error has occurred.</Typography>
    </Container>
  );
};

export default ErrorPage;
