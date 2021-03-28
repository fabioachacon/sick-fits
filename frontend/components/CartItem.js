import styled from 'styled-components';
import { formatMoney } from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  img {
    margin-right: 1rem;
    width: 100px;
  }

  ,
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  console.log('product here', product);
  return (
    <>
      <CartItemStyles>
        <img src={product?.photo?.image?.publicUrlTransformed} alt="" />
        <div>
          <h3>{product.name}</h3>
          <p>
            {formatMoney(product.price * cartItem.quantity)}-
            <em>
              {cartItem.quantity} &times; {formatMoney(product.price)} each
            </em>
          </p>
        </div>
        <RemoveFromCart id={product.id} />
      </CartItemStyles>
    </>
  );
};

export default CartItem;
