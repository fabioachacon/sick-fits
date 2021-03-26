import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/CartState';

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button onClick={openCart} type="button">My Cart</button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sing In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
