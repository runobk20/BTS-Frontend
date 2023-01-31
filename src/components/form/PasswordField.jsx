import { useState } from "react";
import { Field, useField } from "formik"
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"

export function PasswordField({label, icon, ...props}) {
    const [field, meta] = useField(props);
    const [show, setShow] = useState();
    const handleShowPassword = () => setShow(!show);

    return (
        <FormControl mb={4} isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                {icon && <InputLeftElement pointerEvents='none' justifyContent='start' children={icon} fontSize={{base: '16', lg: '25'}}/>}
                <Field as={Input} {...props} {...field} type={show ? 'text' : 'password'} pl={icon ? { sm: '8', lg: '10'} : 0} size={{base: 'md', lg: 'lg'}}/>
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowPassword}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}