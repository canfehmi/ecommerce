import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { IProduct } from "../../model/IProduct"
import { AddShoppingCart } from "@mui/icons-material"
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";

interface Props {
    product: IProduct
}

export default function Product({product} : Props){
  return(
    <Card>
      <CardMedia sx={{ height: 160, backgroundSize: "contain"}} image={`http://localhost:5246/images/${product.imageUrl}`} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2" color="text-secondary" >
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {(product.price).toFixed(2)} ₺
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" startIcon={<AddShoppingCart/>} color="success">Add to Card</Button>
        <Button component={Link} to={`/catalog/${product.id}`} size="small" startIcon={<SearchIcon/>} color="primary">View</Button>
      </CardActions>
    </Card>
  )
}