import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { ALL_PRODUCTS_QUERY } from './Products';
import DisplayError from './ErrorMessage';
/* eslint-disable prettier/prettier */

const CREATE_PRODUCT_MUTATION = gql`
 mutation CREATE_PRODUCT_MUTATION(
     $name: String!
     $description: String!
     $price: Int!
     $image: Upload
 ) {
  createProduct(data: {
    name: $name,
    description: $description,
    price: $price,
    status: "AVAILABLE",
    photo: {
        create: {
            image: $image,
            altText: $name
        }
    }
  }){
    id
    price
    description
    name
  }
}
`;

function CreateProduct() {
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        name: 'Nice Nice Nice',
        price: 3333,
        description: '',
        image: ''
    });

    const [createProduct, { loading, error, data } ] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs,
        refetchQueries: [{query: ALL_PRODUCTS_QUERY}]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProduct();
        clearForm();

        // Go to the product's pages
        Router.push({
            pathname: `/product/${data.createProduct.id}`,
        });

    }

  return (
    <Form onSubmit={handleSubmit}>
     <DisplayError error={error} />
     <fieldset disabled={loading} aria-busy={loading}>
      <label htmlFor="image">
         Image
        <input 
         type="file" 
         id="image" 
         name="image" 
         required
         onChange={handleChange}  
         />
      </label>
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
      <button type='submit'>+ Add Product</button>
     </fieldset>
    </Form>
  );
}

export default CreateProduct;
