/* eslint-disable prettier/prettier */

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!){
        deleteProduct(id: $id){
            id
            name
        }
    }
`;

const update = (cache, payload) => {
    cache.evict(cache.identify(payload.data.deleteProduct))
}

const DeleteProduct = ({ id, children }) => {
        const [deleteProduct, { loading, error }] = useMutation(
            DELETE_PRODUCT_MUTATION, 
            { 
                variables: { id },
                update,
            });

       return (
       <button disabled={loading} type='button' onClick={ async () => {
            if (confirm('Are you sure?')) {
               try{
                await deleteProduct();
               }catch(error){
                   console.error(error);
               }
            }
        }}>
            { children }
        </button>
        )
}

export default DeleteProduct;
