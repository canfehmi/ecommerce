import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AdressForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("firstname", {
            required: "İsim alanı boş bırakılamaz.",
          })}
          label="İsminizi Girin"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.firstname}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("surname", {
            required: "Soyad alanı boş bırakılamaz.",
          })}
          label="Soyisminizi Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.surname}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("phone", {
            required: "Telefon boş bırakılamaz.",
          })}
          label="Telefon numaranızı Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.phone}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("city", {
            required: "Şehir boş bırakılamaz.",
          })}
          label="Şehrinizi Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.city}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          {...register("adressdetail", {
            required: "Adres boş bırakılamaz.",
          })}
          label="Adresinizi Girin"
          fullWidth
          multiline
          rows={4}
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.adressdetail}
        ></TextField>
      </Grid>
    </Grid>
  );
}
