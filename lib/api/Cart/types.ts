type CartItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  params?: Record<string, string>[];
};
export type { CartItem };
