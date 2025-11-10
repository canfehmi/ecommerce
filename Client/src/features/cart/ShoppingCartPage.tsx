import {
  Alert,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AddCircle, Delete, RemoveCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function ShoppingCartPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (cart?.cartItems.length === 0)
    return <Alert severity="warning">Sepette ürün yok.</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ürün Adı</TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="right">Adet</TableCell>
            <TableCell align="right">Toplam Tutar</TableCell>
            <TableCell align="right">Sil</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.cartItems.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={`http://localhost:5246/images/${row.imageUrl}`}
                  style={{ height: 60 }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {currencyTRY.format(row.price)}
              </TableCell>
              <TableCell align="right">
                <LoadingButton
                  loading={
                    status === "pendingDeleteItem" + row.productId + "single"
                  }
                  onClick={() =>
                    dispatch(
                      deleteItemFromCart({
                        productId: row.productId,
                        quantity: 1,
                        key: "single",
                      })
                    )
                  }
                >
                  <RemoveCircle />
                </LoadingButton>
                {row.quantity}
                <LoadingButton
                  loading={status === "pendingAddItem" + row.productId}
                  onClick={() =>
                    dispatch(addItemToCart({ productId: row.productId }))
                  }
                >
                  <AddCircle />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{row.price * row.quantity} ₺</TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  loading={
                    status === "pendingDeleteItem" + row.productId + "all"
                  }
                  onClick={() =>
                    dispatch(
                      deleteItemFromCart({
                        productId: row.productId,
                        quantity: row.quantity,
                        key: "all",
                      })
                    )
                  }
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <CartSummary />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
