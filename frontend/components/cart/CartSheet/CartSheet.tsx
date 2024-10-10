'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import CartItemCard from '@/components/cart/CartItemCard'; // Importuj komponent CartItemCard
import { CartItem } from '@/lib/api/Cart';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { removeCartItem } from '@/lib/api/Cart/methods';
import { useToast } from '@/hooks/use-toast';

const SHIPPING_COST = 10;
interface CartSheetProps {
  initialCartItems: CartItem[];
}
const CartSheet = ({ initialCartItems }: CartSheetProps) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems || []);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };
  const deleteCartItem = async (item: CartItem) => {
    try {
      const res = await removeCartItem(item.id);

      toast({
        description: res,
        duration: 2000,
        variant: 'success',
      });

      setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } catch {
      toast({
        description: 'Wystąpił błąd podczas usuwania produktu',
        duration: 2000,
        variant: 'destructive',
      });
    }
  };

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
        {cartItems.length > 0 ? (
          <ScrollArea className="h-[calc(100%-76px-144.2px)]">
            {cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onDelete={() => deleteCartItem(item)} />
            ))}
          </ScrollArea>
        ) : (
          <SheetDescription className="flex h-[calc(100%-76px-144.2px)] items-center justify-center">Your cart is empty</SheetDescription>
        )}

        <div className="absolute bottom-0 grid w-full grid-cols-1 grid-rows-[auto_auto_auto] gap-[10px] p-[20px] shadow-top">
          <div className="arial-regular-14 row-start-1 flex justify-between">
            <span>Shipping</span>
            <span>€{SHIPPING_COST.toFixed(2)}</span>
          </div>
          <div className="arial-bold-22 row-start-2 flex justify-between">
            <span>Order:</span>
            <span>€{(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + SHIPPING_COST).toFixed(2)}</span>
          </div>
          <Button className="arial-bold-22 row-start-3 mt-[5px] rounded-none">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { CartSheet };
