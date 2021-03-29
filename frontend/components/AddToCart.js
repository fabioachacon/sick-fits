import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCat, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  return (
    <button disabled={loading} onClick={addToCat} type="button">
      Add{loading && 'ing'} To Cart
    </button>
  );
};

export default AddToCart;
