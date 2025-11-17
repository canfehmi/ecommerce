import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router";
import { loginUser } from "./accountSlice";
import { useAppDispatch } from "../../store/store";
import { getCart } from "../cart/cartSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function submitForm(data: FieldValues) {
    await dispatch(loginUser(data));
    await dispatch(getCart());
    navigate(location.state?.from || "/catalog");
  }
  return (
    <Container maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
        <Avatar
          sx={{
            mx: "auto",
            color: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          sx={{ mt: 2 }}
          noValidate
        >
          <TextField
            {...register("username", {
              required: "Kullanıcı adı boş bırakılamaz.",
            })}
            label="Kullanıcı Adını Girin"
            fullWidth
            required
            autoFocus
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            {...register("password", {
              required: "Şifre boş bırakılamaz.",
              minLength: {
                value: 6,
                message: "Şifre minimum 6 karakterden oluşmalıdır.",
              },
            })}
            label="Şifrenizi Girin"
            fullWidth
            required
            size="small"
            type="password"
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            loading={isSubmitting}
            disabled={!isValid}
          >
            Giriş Yap
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
