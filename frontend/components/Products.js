import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 60px;
`;

const Products = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <ProductListStyles>
        {data.allProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </ProductListStyles>
    </div>
  );
};
export default Products;
