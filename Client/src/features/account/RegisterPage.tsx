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
import { useNavigate } from "react-router";
import requests from "../../api/requests";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    requests.Account.register(data)
      .then(() => {
        toast.success("user created.");
        navigate("/login");
      })
      .catch((result) => {
        const { data: errors } = result;

        errors.forEach((error: any) => {
          if (error.code == "DuplicateUserName") {
            setError("username", { message: error.description });
          } else if (error.code == "DuplicateEmail") {
            setError("email", { message: error.description });
          }
        });
      });
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
          Üye Ol
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
            autoFocus
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>

          <TextField
            {...register("name", {
              required: "İsim boş bırakılamaz.",
            })}
            label="İsminizi Girin"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.name}
            helperText={errors.name?.message}
          ></TextField>

          <TextField
            {...register("email", {
              required: "Email boş bırakılamaz.",
            })}
            label="Email Girin"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email?.message}
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
            Üye Ol
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
