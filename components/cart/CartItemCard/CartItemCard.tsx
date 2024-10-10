import { useState } from 'react';
import QuantityInput from '../QuantityInput';
import { CartItem } from '@/lib/api/Cart';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}
const CartItemCard = ({ item, onUpdateQuantity, onDelete }: CartItemCardProps) => {
  const { name, price, originalPrice, quantity, params } = item;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  return (
    <div className="relative grid w-full grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center justify-between border-b p-[20px] py-[20px] sm:grid-rows-1">
      <div className="row-span-1row-start-1 col-span-1 col-start-1 mr-[30px] h-[75px] w-[100px] self-start rounded bg-gray-200"></div>
      <div className="col-span-1 col-start-2 row-span-1 row-start-1 self-start">
        <h3 className="arial-regular-22 mb-[10px]">{name}</h3>
        {params?.map((param, index) => (
          <div key={index} className="">
            {Object.keys(param).map((key) => (
              <p key={key} className="arial-bold-14 mb-[5px]">
                {key}: <span className="arial-regular-14 text-[#6565c9]">{param[key]}</span>
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="col-span-2 col-start-1 row-span-1 row-start-2 mt-[20px] flex flex-row items-center justify-between sm:col-span-1 sm:col-start-2">
        <div className="arial-regular-14 flex items-center justify-center gap-3">
          <p className="arial-bold-14">Qty:</p>
          <QuantityInput
            quantity={currentQuantity}
            setQuantity={(newQuantity) => {
              setCurrentQuantity(newQuantity);
              onUpdateQuantity(item.id, newQuantity);
            }}
          />
        </div>
        <div className="relative flex">
          <p className="arial-regular-22 right-0 mr-2 text-gray-500 line-through sm:absolute sm:top-[-22px] sm:mr-0">
            {originalPrice ? `€${originalPrice.toFixed(2)}` : null}
          </p>
          <p className="arial-bold-22">€{price.toFixed(2)}</p>
        </div>
      </div>
      <div className="absolute right-[5px] top-[5px]">
        <Button variant="ghost" onClick={() => onDelete(item.id)}>
          <X />
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
