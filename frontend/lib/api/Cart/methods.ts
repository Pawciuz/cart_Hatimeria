import axios from 'axios';
import { CartItem } from './types';

const API_URL = 'http://localhost:5042/api/Cart';

export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await axios.get<CartItem[]>(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCartItem = async (item: CartItem): Promise<CartItem> => {
  try {
    const response = await axios.post<CartItem>(API_URL, item);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCartItem = async (id: string): Promise<string> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return 'Usunięto produkt z koszyka';
  } catch (error) {
    throw error;
  }
};
