'use server';
import { getCartItems } from '@/lib/api/Cart/methods';
import { CartSheet } from './CartSheet';

const CartSheetContainer = async () => {
  const initialCartItems = await getCartItems();
  return <CartSheet initialCartItems={initialCartItems} />;
};
export { CartSheetContainer as CartSheet };
