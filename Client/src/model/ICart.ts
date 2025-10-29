export interface CartItem{
    productId: number,
    name: string,
    price: number,
    quantity:number,
    imageUrl: string
}

export interface Cart{
    cartId:number,
    cartItems: CartItem[],
    customerId: string
}