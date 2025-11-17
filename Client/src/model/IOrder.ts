export interface Order {
  id: number
  firstName: any
  surname: any
  phone: any
  city: any
  adressDetail: any
  customerId: any
  subTotal: number
  deliveryPrice: number
  orderDate: Date
  orderItems: OrderItem[]
  orderStatus: number
}

export interface OrderItem {
  id: number
  productId: number
  productName: string
  productImage: string
  price: number
  quantity: number
}
