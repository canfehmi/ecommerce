import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, CircularProgress, Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import CartDropZone from "./CardDropZone";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts, selectAllProducts } from "../catalog/catalogSlice";
import { useEffect } from "react";
import { addItemToCart } from "../cart/cartSlice";
import { IProduct } from "../../model/IProduct";

const ShopPage = () => {
  const products = useAppSelector(selectAllProducts);
  const { status, isLoaded } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchProducts());
    }
  }, [isLoaded]);

  if (status === "pendingFetchProducts") return <CircularProgress />;

  const handleDropProduct = async (product: IProduct) => {
    console.log("Ürün sepete eklendi:", product);

    dispatch(addItemToCart({ productId: product.id }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={6}>
        <Grid
          size={8}
          sx={{
            borderRight: "1px solid",
            borderColor: "divider",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Box>
        </Grid>
        <Grid size={4} sx={{ p: 3 }}>
          <CartDropZone onDropProduct={handleDropProduct} />
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default ShopPage;
