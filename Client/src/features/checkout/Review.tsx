import { DeliveryDiningRounded, PaymentsRounded } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Review() {
  const { getValues } = useFormContext();

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Stack
        direction="column"
        divider={<Divider />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <DeliveryDiningRounded color="primary" sx={{ mr: 1 }} />
            Teslimat Bilgileri
          </Typography>
          <Typography sx={{ color: "text.secondary" }} gutterBottom>
            {getValues("firstname")} {getValues("surname")}
          </Typography>
          <Typography sx={{ color: "text.secondary" }} gutterBottom>
            {getValues("phone")}
          </Typography>
          <Typography sx={{ color: "text.secondary" }} gutterBottom>
            {getValues("adressdetail")} / {getValues("city")}
          </Typography>
        </div>
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <PaymentsRounded color="primary" sx={{ mr: 1 }} />
            Ödeme Bilgileri
          </Typography>
          <Typography sx={{ color: "text.secondary" }} gutterBottom>
            {getValues("card_name")}
          </Typography>
          <Typography sx={{ color: "text.secondary" }} gutterBottom>
            {getValues("card_number")}
          </Typography>
          <Typography sx={{ color: "text.secondary" }} gutterBottom>
            {getValues("card_expiry_date")}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
}
