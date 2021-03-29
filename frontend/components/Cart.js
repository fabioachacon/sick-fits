import { calcTotalPrice } from '../lib/calcTotalPrice';
import { useCart } from '../lib/CartState';
import { formatMoney } from '../lib/formatMoney';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import CloseButton from './styles/CloseButton';
import CheckOut from './CheckOut';

const Cart = () => {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) {
    return null;
  }
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <CloseButton onClick={closeCart}>&times;</CloseButton>
      <ul>
        {me.cart.map((cartItem, key) => (
          <CartItem key={key} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <CheckOut />
      </footer>
    </CartStyles>
  );
};

export default Cart;
