import { useDrop } from "react-dnd";
import { Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch } from "../../store/store";
import { addItemToCart } from "../cart/cartSlice";
import { IProduct } from "../../model/IProduct";

interface CartDropZoneProps {
  onDropProduct: (product: any) => void;
}

const CartDropZone: React.FC<CartDropZoneProps> = ({ onDropProduct }) => {
  const dispatch = useAppDispatch();
  const handleDropProduct = async (product: IProduct) => {
    dispatch(addItemToCart({ productId: product.id }));
  };
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "PRODUCT",
    drop: (item: IProduct) => {
      onDropProduct(item), handleDropProduct(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={dropRef} // ← Ref buraya
      sx={{
        width: "100%",
        height: "400px",
        border: "2px dashed #999",
        borderRadius: 2,
        backgroundColor: isOver ? "#e0f7fa" : "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: 60 }} />
    </Box>
  );
};

export default CartDropZone;
