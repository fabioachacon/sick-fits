import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

const BigButton = styled.button`
  font-size: 2rem;
  background: none;
  border: 0;
  cursor: pointer;
  &:hover {
    color: var(--red);
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) { id },
  }
`;

const RemoveFromCart = ({ id }) => {

  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update
  });

  return (
    <BigButton
      onClick={removeFromCart}
      type="button"
      title="Remove this item from cart"
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
