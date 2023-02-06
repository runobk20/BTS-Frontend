import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { Field, useField } from "formik";

export function TextareaField({label, ...props}) {

    const [field, meta] = useField(props);

    return (
        <FormControl mb={3} isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <Field as={Textarea} {...field} {...props} focusBorderColor='purple.300' size={{base: 'sm', lg: 'lg'}} resize='vertical'/>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )

}