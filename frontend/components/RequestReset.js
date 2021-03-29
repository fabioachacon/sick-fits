import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

/* eslint-disable prettier/prettier */

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION(
        $email: String!

    ){
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
    
 
`;

const RequestReset = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const [signup, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
        variables: inputs,
        // refetchQueries: [{query: CURRENT_USER_QUERY }]
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signup();
            console.log(res);
        }catch(error){
            console.error(error);
        }
        resetForm();
        // Send the email and password to the graphqlAPI
    }

    return (
        <Form method="POST" onSubmit={handleSubmit} >
            <h2>Reset a Password Reset</h2>
            <DisplayError error={error} />
            {data?.sendUserPasswordResetLink === null && (
                <p>
                    Success! Check your email for a link!
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
                <button type='submit'>Request Reset</button>
            </fieldset>
        </Form>
    )
}

export default RequestReset;