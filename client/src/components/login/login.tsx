import React, { useCallback, useEffect } from "react";
import * as yup from "yup";
import { useUserLoginMutation } from "../../authapi/authapi";
import {
  Grid,
  Typography,
  Paper,
  Avatar,
  Container,
  TextField,
  Button,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserLoginInput } from "../../interfaces/userInteface";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<UserLoginInput>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [userlogin] = useUserLoginMutation();
  const { errors } = formState;

  const onSubmit = useCallback(
    async (data: UserLoginInput) => {
      data.email = data.email.toLowerCase();
      const { email, password } = data;
      await userlogin({
        email,
        password,
      });
      navigate("/home");
    },
    [navigate, userlogin]
  );

  return (
    <Container>
      <Grid display={"flex"} justifyContent="center">
        <Paper
          elevation={8}
          sx={{ height: "70vh", width: 270, p: 10, margin: "10 auto" }}
        >
          <Grid
            container
            display={"flex"}
            direction={"column"}
            spacing={4}
            justifyContent={"center"}
            alignItems={"center"}
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid item justifyContent={"center"}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <LockOpenIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" component={"h4"}>
                login
              </Typography>
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
                {...register("password")}
                error={!!errors.password}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
                sx={{ m: "16px" }}
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <Link to={"/signup"}>
                <Typography variant="h6" component="h6">
                  New user! SignUp
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Login;
