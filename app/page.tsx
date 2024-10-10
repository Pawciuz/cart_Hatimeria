import CartSheet from '@/components/cart/CartSheet';
import { Suspense } from 'react';

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartSheet />
    </Suspense>
  );
};
export default Home;
