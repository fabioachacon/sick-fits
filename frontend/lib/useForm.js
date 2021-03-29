/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

const useForm = (initial = {}) => {
    const [inputs, setInputs] = useState(initial);
    const initialValues = Object.values(initial).join('');

    useEffect(() => {    
        setInputs(initial);
    }, [initialValues])

    const handleChange = (e) => {
        let { name, value, type } = e.target;

        if (type === 'number') {
            value = parseInt(value)
        }

        if (type === 'file') {
            [value] = e.target.files;
        }

        setInputs({
            ...inputs,
             [name]: value
        })
    }

    const resetForm = () => {
        setInputs(initial);
    }

    const clearForm = () => {
        const propertiesArray = Object.entries(inputs).map(([key, value]) => [key, '']);
        const blankState = Object.fromEntries(propertiesArray);
        setInputs(blankState);
    }

    return {inputs, handleChange, resetForm, clearForm};
}

export default useForm;
