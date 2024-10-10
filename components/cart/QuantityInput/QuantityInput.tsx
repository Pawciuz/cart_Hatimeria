import { Button } from '@/components/ui/Button';

interface QuantityInputProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}
const QuantityInput = ({ quantity, setQuantity }: QuantityInputProps) => {
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center  border-[1px] rounded-[4px] w-[110px]">
      <Button
        onClick={handleDecrement}
        disabled={quantity === 1}
        className="arial-regular-22  text-white w-[30px] h-[30px]"
      >
        -
      </Button>
      <span className="w-[50px] h-[30px]  flex justify-center items-center">
        {quantity}
      </span>
      <Button
        onClick={handleIncrement}
        className="arial-regular-22 text-white w-[30px] h-[30px]"
      >
        +
      </Button>
    </div>
  );
};

export default QuantityInput;
