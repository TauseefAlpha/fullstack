import React, { useCallback, useState } from "react";

import { useRegisterUserMutation } from "../../authapi/authapi";
import {
  Grid,
  Typography,
  Paper,
  Avatar,
  Container,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterUserInput } from "../../interfaces/userInteface";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInput>({ resolver: yupResolver(schema) });
  const [error, setError] = useState<string|null>(null);

  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: RegisterUserInput) => {
      data.email = data.email.toLowerCase();
      const { firstName, lastName, email, password } = data;
      const register = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      if (register) {
        navigate("/");
      } else {
        setError("Email already exists ");
      }
    },
    [navigate, registerUser]
  );

  return (
    <Container>
      <Grid display={"flex"} justifyContent="center">
        <Paper
          elevation={8}
          sx={{ height: "75vh", width: 270, p: 10, margin: "10 auto" }}
        >
          <Grid
            container
            display={"flex"}
            direction={"column"}
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && (
              <Grid item>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            <Grid item justifyContent={"center"}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <LockOpenIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" component={"h4"}>
                Register
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="firstName"
                required
                type="text"
                {...register("firstName")}
                error={!!errors.firstName}
              />
            </Grid>
            <Grid item>
              <TextField
                label="lastName"
                required
                type="text"
                {...register("lastName")}
                error={!!errors.lastName}
              />
            </Grid>
            <Grid item>
              <TextField
                label="email"
                required
                type="email"
                {...register("email")}
                error={!!errors.email}
              />
            </Grid>
            <Grid item>
              <TextField
                label="password"
                required
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                error={!!errors.password}
              />
            </Grid>
            <Grid item>
              <TextField
                label="confirmPassword"
                required
                type="password"
                {...register("confirmpassword")}
                error={!!errors.confirmpassword}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
                sx={{ m: 2 }}
              >
                SignUp
              </Button>
            </Grid>
            <Grid item>
              <Link to={"/"}>
                <Typography variant="h6" component="h6">
                  Already Account! Login
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default SignUp;
