import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store/store";
import { currencyTRY } from "../../utils/formatCurrency";

export default function Info() {
  const { cart } = useAppSelector((state) => state.cart);
  const Price =
    cart?.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    ) ?? 0;

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Toplam
      </Typography>
      <Typography gutterBottom variant="h4">
        {currencyTRY.format(Price)}
      </Typography>
      <List>
        {cart?.cartItems.map((item) => (
          <ListItem key={item.productId} sx={{ py: 1, px: 0 }}>
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={`http://localhost:5246/images/${item.imageUrl}`}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mr: 2 }}
              primary={item.name}
              secondary={`x ${item.quantity}`}
            />
            <Typography variant="body1">
              {currencyTRY.format(item.price)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}
