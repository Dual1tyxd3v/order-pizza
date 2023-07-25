export type Pizza = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

export type MenuType = Pizza[];

export type OrderType = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: true;
  estimatedDelivery: string;
  cart: OrderCart[];
  position: string;
  orderPrice: number;
  status: string;
  priorityPrice: number;
};

export type OrderCart = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type NewOrderType = {
  address: string;
  cart: OrderCart[];
  customer: string;
  phone: string;
  priority: boolean;
};
