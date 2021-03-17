/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */

import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Router } from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

// 1. We need to get the existing product
// 2. We need to get the mutation to update the product
// 3. We need the form to handle the updates

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: {
            id: $id
            }){
             name
             price
             description
            }
        }
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String,
        $description: String,
        $price: Int,
    ){
        updateProduct(
            id: $id
            data: {
                name: $name
                description: $description
                price: $price
            }
        ){
            id
            name
            description
            price
        }
    }
`;

const UpdateProduct = ({ id }) => {

    const {data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY,  { variables: { id } })

    const [updateProduct, { data: updateData, error: updateError, loading: updateLoading }] 
    = useMutation(UPDATE_PRODUCT_MUTATION);

    const { inputs, handleChange, clearForm, resetForm } = useForm(
        data?.Product || {
        name: '',
        description: '',
        price: '',
      });
      
    console.log('inputs in update', inputs);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateProduct({ variables: { 
                id,                
                name: inputs.name,
                description: inputs.description,
                price: inputs.price
               
            }}).catch(console.error);

        console.log(res);
        
        // clearForm();

        // // Go to the product's pages
        // Router.push({
        //     pathname: `/product/${updateData.createProduct.id}`,
        // });

    }

    return (
        <Form onSubmit={handleSubmit}>
         <DisplayError error={error || updateError} />
         <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          {/* <label htmlFor="image">
             Image
            <input 
             type="file" 
             id="image" 
             name="image" 
             required
             onChange={handleChange}  
             />
          </label> */}
          <label htmlFor="name">
             Name
            <input 
             type="text" 
             id="name" 
             name="name" 
             placeholder="name"
             value={inputs.name}
             onChange={handleChange}  
             />
          </label>
          <label htmlFor="price">
             Price
            <input 
             type="number" 
             id="price" 
             name="price" 
             placeholder="price"
             value={inputs.price}
             onChange={handleChange}   
             />
          </label>
          <label htmlFor="description">
             Description
            <textarea
              id="description" 
              name="description" 
              placeholder="description"
              value={inputs.description}
              onChange={handleChange} 
              />
          </label>
          <button type='submit'>Update Product</button>
         </fieldset>
        </Form>
      );
}

export default UpdateProduct;
