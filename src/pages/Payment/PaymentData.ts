export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export const orderData: OrderItem[] = [
    { id: '1', name: 'Whey Apple Flavor', price: 99.00, quantity: 1 },
    { id: '2', name: 'Protein Bar - Chocolate', price: 2.50, quantity: 5 },
    { id: '3', name: 'Pre-Workout Powder', price: 39.99, quantity: 1 },
    { id: '4', name: 'Resistance Band Set', price: 24.99, quantity: 1 },
  ];
  