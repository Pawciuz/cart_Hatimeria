import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import CartItemCard from '@/components/cart/CartItemCard'; // Importuj komponent CartItemCard
import { CartItem } from '@/lib/api/Cart';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/ScrollArea';

// Lista przykładowych elementów koszyka
const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'T-shirt',
    price: 59.95,
    originalPrice: 99.95,
    quantity: 2,
    params: [{ Size: 'M', Color: 'Red', Pattern: 'Floral' }],
  },
  {
    id: '2',
    name: 'Dress',
    price: 80.55,
    originalPrice: 100.55,
    quantity: 1,
    params: [{ Size: 'L', Color: 'Blue', Pattern: 'Solid' }],
  },
  {
    id: '3',
    name: 'Backpack',
    price: 120.5,
    originalPrice: 160.5,
    quantity: 1,
    params: [],
  },
  {
    id: '4',
    name: 'Backpack',
    price: 120.5,
    originalPrice: 160.5,
    quantity: 1,
    params: [],
  },
  {
    id: '5',
    name: 'Backpack',
    price: 120.5,
    originalPrice: 160.5,
    quantity: 1,
    params: [],
  },
  {
    id: '6',
    name: 'Backpack',
    price: 120.5,
    originalPrice: 160.5,
    quantity: 1,
    params: [],
  },
];
const SHIPPING_COST = 10;
const CartSheet = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Funkcja do aktualizacji ilości produktów w koszyku
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };
  const sumItems = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + SHIPPING_COST;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Cart</Button>
      </SheetTrigger>
      <SheetContent className="w-screen p-0 sm:w-[36%] sm:min-w-[460px] sm:max-w-[520px]">
        <SheetHeader>
          <SheetTitle className="arial-bold-28 flex justify-between p-[20px] shadow-md">
            Cart ({cartItems.length})
            <SheetClose asChild>
              <Button variant="ghost">
                <X />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100%-76px-144.2px)]">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onDelete={() => setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id))}
            />
          ))}
        </ScrollArea>

        <div className="shadow-top absolute bottom-0 grid w-full grid-cols-1 grid-rows-[auto_auto_auto] gap-[10px] p-[20px]">
          <div className="arial-regular-14 row-start-1 flex justify-between">
            <span>Shipping</span>
            <span>€{SHIPPING_COST.toFixed(2)}</span>
          </div>
          <div className="arial-bold-22 row-start-2 flex justify-between">
            <span>Order:</span>
            <span>€{sumItems.toFixed(2)}</span>
          </div>
          <Button className="arial-bold-22 row-start-3 mt-[5px] rounded-none">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
