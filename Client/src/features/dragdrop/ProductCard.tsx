import { useDrag } from "react-dnd";
import { Card, CardContent, Typography } from "@mui/material";
import { currencyTRY } from "../../utils/formatCurrency";
import { IProduct } from "../../model/IProduct";

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "PRODUCT",
    item: product,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={dragRef}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        width: 200,
        margin: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">
          {currencyTRY.format(product.price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
