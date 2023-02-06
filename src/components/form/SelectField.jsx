import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";
import { Field, useField } from "formik";

export function SelectField({label, options = [], ...props}) {
    const [field, meta] = useField(props);

    return (
        <FormControl mb={3} isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
                <Field as={Select} {...field} {...props} size={{base: 'md', lg: 'lg'}} focusBorderColor='purple.300'>
                    {
                        options.map(selectOption => {
                            const [key, value] = Object.entries(selectOption)[0];
                            return <option key={key} value={value}>{value}</option>
                        })
                    }
                </Field>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}