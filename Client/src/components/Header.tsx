import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearCart } from "../features/cart/cartSlice";

const links = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Catalog", to: "/catalog" },
  { title: "Contact", to: "/contact" },
  { title: "Error", to: "/error" },
];

const authLinks = [
  { title: "Login", to: "/login" },
  { title: "Register", to: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
  },
  "&.active": {
    color: "warning.main",
  },
};

export default function Header() {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const cartCount = cart?.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">E-Ticaret</Typography>
          <Stack direction="row">
            {links.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={navStyles}
              >
                {link.title}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={Link}
            to="/cart"
            size="large"
            edge="start"
            color="inherit"
          >
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCart></ShoppingCart>
            </Badge>
          </IconButton>

          {user ? (
            <Stack direction="row">
              <Button sx={navStyles}>{user.name}</Button>
              <Button
                sx={navStyles}
                onClick={() => {
                  dispatch(logout());
                  dispatch(clearCart());
                }}
              >
                Çıkış Yap
              </Button>
            </Stack>
          ) : (
            <>
              <Stack direction="row">
                {authLinks.map((link) => (
                  <Button
                    key={link.to}
                    component={NavLink}
                    to={link.to}
                    sx={navStyles}
                  >
                    {link.title}
                  </Button>
                ))}
              </Stack>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
