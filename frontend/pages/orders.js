import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import ErrorMessage from '../components/ErrorMessage';
import { formatMoney } from '../lib/formatMoney';
import styled from 'styled-components';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import Link from 'next/link';
import Head from 'next/head';
import { Fragment } from 'react';

const USER_ORDER_QUERY =  gql`
    query USER_ORDER_QUERY {
        allOrders {
            id
            charge
            total
            user {
                id
            }
            items {
                id
                name
                description
                price
                quantity
                photo {
                    image {
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 2rem;
`;

const countItemsInOrder = (order) => {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

const OrderPage = () => {
    const { data, loading, error } =  useQuery(USER_ORDER_QUERY);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage error={error} />;

    const { allOrders } = data;

    return (
        <div>
          <Head>
            <title>Your Orders: ({allOrders.length})</title>
          </Head>
          <h2>You have {allOrders.length} orders!</h2>
          <OrderUl>
            {allOrders.map(order => (
              <OrderItemStyles>
                <Link href={`/order/${order.id}`}>
                  <a>
                    <div className="order-meta">
                      <p>{countItemsInOrder(order)} Items</p>
                      <p>{order.items.length} Product{order.items.length > 1 ? 's' : ''}</p>
                      <p>{formatMoney(order.total)}</p>
                    </div>
                    <div className="images">
                        {order.items.map(item => (
                        <img src={item.photo?.image?.publicUrlTransformed} key={`image-${item.id}`} alt={item.name} />
                      ))}
                    </div>
                  </a>
                </Link>
              </OrderItemStyles>
            ))}
          </OrderUl>
        </div>
    )
}

export default OrderPage;
