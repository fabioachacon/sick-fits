import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

/* eslint-disable prettier/prettier */

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $name: String!
        $email: String!
        $password: String!
    ) {
        createUser(data: {
            name: $name,
            email: $email
            password: $password
        }) {
            id
            email
            name
        }
    } 
`;

const SignUp = () => {
    const { inputs, handleChange, resetForm } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
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
            <h2>Sign Up For an Account</h2>
            <DisplayError error={error} />
            {data?.createUser && <p>Signed up with {data.createUser.email} 
             - Please Go Ahead and Sign in!</p> }
            <fieldset disabled={loading}>
                <label htmlFor="email">
                    Name
                    <input 
                        type="text" 
                        name='name' 
                        placeholder='name' 
                        autoComplete='name'
                        value={inputs.name}
                        onChange={handleChange}
                        required
                         />
                </label>
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

export default SignUp;