
import { Alert, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircle, Delete, RemoveCircle } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import requests from "../../api/requests";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";

export default function ShoppingCartPage()
{
    const {cart, setCart } = useCartContext();
    const [status, setstatus] = useState({loading: false, id: ""})

    function handleAddItem(productId: number, id: string){
        setstatus({loading:true, id:id});

        requests.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setstatus({loading:false, id:""}));
    }

    function handleDeleteItem(productId: number, id: string, quantity = 1){
        setstatus({loading:true, id:id});

        requests.Cart.deleteItem(productId,quantity)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setstatus({loading:false, id:""}));
    }

    if(cart?.cartItems.length === 0) return <Alert severity="warning">Sepette ürün yok.</Alert>

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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        <img src={`http://localhost:5246/images/${row.imageUrl}`} style={{height:60}} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{currencyTRY.format(row.price)}</TableCell>
                    <TableCell align="right">
                        <LoadingButton loading={status.loading && status.id === "delete" + row.productId} onClick={() => handleDeleteItem(row.productId, "delete" + row.productId)}>
                            <RemoveCircle/>
                        </LoadingButton>
                        {row.quantity}
                        <LoadingButton loading={status.loading && status.id === "add" + row.productId} onClick={() => handleAddItem(row.productId, "add" + row.productId)}>
                            <AddCircle/>
                        </LoadingButton>
                        </TableCell>
                    <TableCell align="right">{row.price * row.quantity} ₺</TableCell>
                    <TableCell align="right">
                        <IconButton color="error" loading={status.loading && status.id === "deleteAll" + row.productId} onClick={() => handleDeleteItem(row.productId, "deleteAll" + row.productId, row.quantity)}>
                            <Delete />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                <CartSummary />
                </TableBody>
            </Table>
        </TableContainer>
    )
}