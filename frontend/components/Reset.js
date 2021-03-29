import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

/* eslint-disable prettier/prettier */

const RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION(
        $email: String!
        $token: String!
        $password: String!

    ){
        redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
            code
            message
        }
    }
    
 
`;

const Reset = ({ token }) => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        token
    });

    const [reset, { data, loading, error: resetPasswordError }] = useMutation(RESET_MUTATION, {
        variables: inputs,
    })

    const error = data?.redeemUserPasswordResetToken?.code ? data?.redeemUserPasswordResetToken : undefined;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await reset();
            console.log(res);
        }catch(error){
            console.error(error);
        }
        resetForm();
        // Send the email and password to the graphqlAPI
    }

    return (
        <Form method="POST" onSubmit={handleSubmit} >
            <h2>Reset your Password</h2>
            <DisplayError error={ error || resetPasswordError } />
            {data?.redeemUserPasswordResetToken === null && (
                <p>
                    You can now Sing In!
                </p>
            ) }
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
                <button type='submit'>Request Reset</button>
            </fieldset>
        </Form>
    )
}

export default Reset;