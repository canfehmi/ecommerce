import { Button, Card, Container, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function NotFound()
{
    return (
        <Container component={Card} sx={{p:3}}>
            <Typography variant="h5" gutterBottom >Sayfa Bulunamadı</Typography>
            <Divider />
            <Button variant="contained" sx={{mt:3}} component={NavLink} to="/catalog">Alışverişe Devam Et</Button>
        </Container>
    )
}