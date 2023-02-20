import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { Field, useField } from "formik"

export function TextField({label, ...props}) {
    const [field, meta] = useField(props);

    return (
        <FormControl mb={3} isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <Field as={Input} {...field} {...props} focusBorderColor='purple.300' size={{base: 'md', lg: 'lg'}}/>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}