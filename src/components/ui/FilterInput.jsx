import { Flex, FormControl, FormLabel, IconButton, Select } from "@chakra-ui/react";
import { FaMagic } from "react-icons/fa";

export function FilterInput({value, onChangeFn, filterFn, options = [], defaultValue, label}) {
    return (
        <FormControl display='flex' justifyContent='space-between' alignItems='center'>
        <FormLabel>{label}</FormLabel>
            <Flex gap={3} alignItems='center' w='100%'>
                <Select w='80%' ml='auto' value={value} onChange={onChangeFn} focusBorderColor='purple.300' variant='filled' placeholder={defaultValue}>
                {
                    options.map(selectOption => {
                        const [key, value] = Object.entries(selectOption)[0];
                        return <option key={key} value={value}>{value}</option>
                    })
                }
                </Select>
                <IconButton children={<FaMagic/>} onClick={filterFn}/>
            </Flex>
        </FormControl>
    )

}