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
          {...register("card_name", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="Kart üzerindeki adı Girin"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.card_name}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_number", {
            required: "Kart numarası boş bırakılamaz.",
          })}
          label="Kart Numaranızı Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.card_number}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_expiry_date", {
            required: "Kartın SKT alanı bırakılamaz.",
          })}
          label="Kartın son kullanma tarihini Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.card_expiry_date}
        ></TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_cvv", {
            required: "CVV bırakılamaz.",
          })}
          label="CVV Girin"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.card_cvv}
        ></TextField>
      </Grid>
    </Grid>
  );
}
