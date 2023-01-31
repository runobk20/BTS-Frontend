import { useState } from "react";
import { Field, useField } from "formik"
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"

export function PasswordField({label, ...props}) {
    const [field, meta] = useField(props);
    const [show, setShow] = useState();
    const handleShowPassword = () => setShow(!show);

    return (
        <FormControl mb={4} isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                <Field as={Input} {...props} {...field} type={show ? 'text' : 'password'} size={{base: 'md', lg: 'lg'}}/>
                <InputRightElement width='4.5rem' top={{lg: '3px'}}>
                    <Button h='1.75rem' size='sm' colorScheme='teal' onClick={handleShowPassword}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}