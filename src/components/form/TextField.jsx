import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { Field, useField } from "formik"

export function TextField({label, ...props}) {
    const [field, meta] = useField(props);

    return (
        <FormControl mb={4} isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <Field as={Input} {...field} {...props} size={{base: 'sm', lg: 'lg'}}/>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}