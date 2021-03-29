/* eslint-disable arrow-body-style */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

/* eslint-disable prettier/prettier */

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password){
            ... on UserAuthenticationWithPasswordSuccess {
                sessionToken
                item {
                    id
                    name
                    email
                }
            } 

            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }           
        }
    }
`;

const SignIn = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });

    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{query: CURRENT_USER_QUERY }]
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signin();
        console.log(res);
        resetForm();
        // Send the email and password to the graphqlAPI
    }

    return (
        <Form method="POST" onSubmit={handleSubmit} >
            <h2>Sign Into Your Account</h2>
            <DisplayError error={data?.authenticateUserWithPassword} />
            <fieldset disabled={loading}>
                <label htmlFor="email">
                    Email
                    <input 
                        type="email" 
                        name='email' 
                        placeholder='Your Email Address' 
                        autoComplete='email'
                        value={inputs.email}
                        onChange={handleChange}
                        required
                         />
                </label>
                <label htmlFor="password">
                    Password
                    <input 
                        type="password" 
                        name='password' 
                        placeholder='Password' 
                        autoComplete='password'
                        value={inputs.password}
                        onChange={handleChange}
                        required
                         />
                </label>
                <button type='submit'>Sign In!</button>
            </fieldset>
        </Form>
    )
}

export default SignIn;
