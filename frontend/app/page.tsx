import CartSheet from '@/components/cart/CartSheet';
import { Button } from '@/components/ui/Button';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Suspense
        fallback={
          <Button variant="outline" className="animate-spin">
            <Loader />
          </Button>
        }
      >
        <CartSheet />
      </Suspense>
    </div>
  );
};
export default Home;
