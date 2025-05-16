import { useCart } from '../context/CartContext';

export function useAddToCart() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return handleAddToCart;
}