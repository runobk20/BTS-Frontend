import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { Field, useField } from "formik"

export function TextField({label, icon, ...props}) {
    const [field, meta] = useField(props);

    return (
        <FormControl mb={4} isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                {icon && <InputLeftElement pointerEvents='none' justifyContent='start' children={icon} fontSize={{base: '16', lg: '25'}}/>}
                <Field as={Input} {...field} {...props} pl={icon ? {sm: '8', lg: '10'} : 0} size={{base: 'md', lg: 'lg'}}/>
            </InputGroup>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}