import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardname", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="Kart üzerindeki adı Girin"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardname}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardnumber", {
            required: "Kart numarası boş bırakılamaz.",
          })}
          label="Kart Numaranızı Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardnumber}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpirymonth", {
            required: "Kartın son kullanma ayı alanı bırakılamaz.",
          })}
          label="Kartın son kullanma ayını Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardexpirymonth}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpiryyear", {
            required: "Kartın son kullanma yılı alanı bırakılamaz.",
          })}
          label="Kartın son kullanma yılını Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardexpiryyear}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          {...register("cardcvv", {
            required: "CVV bırakılamaz.",
          })}
          label="CVV Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardcvv}
        ></TextField>
      </Grid>
    </Grid>
  );
}
