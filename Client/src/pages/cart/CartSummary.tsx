import { TableCell, TableRow } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import { currencyTRY } from "../../utils/formatCurrency";

export default function CartSummary(){

    const { cart } = useCartContext();
    const Price = cart?.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0) ?? 0
    const priceWithTax = Price * 0.2;
    const totalPrice = priceWithTax + Price;
        

    return(
        <>
            <TableRow>
                <TableCell align="right" colSpan={5}>Ara Toplam:</TableCell>
                <TableCell align="right">{currencyTRY.format(Price)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>KDV:</TableCell>
                <TableCell align="right">{currencyTRY.format(priceWithTax)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Ödenecek Tutar:</TableCell>
                <TableCell align="right">{currencyTRY.format(totalPrice)}</TableCell>
            </TableRow>
        </>
    )
}