import { Flex, FormControl, IconButton, Select } from "@chakra-ui/react";
import { FaMagic } from "react-icons/fa";

export function FilterInput({value, onChangeFn, filterFn, options = [], defaultValue }) {
    return (
        <FormControl display='flex' alignItems='center' gap={3}>
            <Flex gap={3} w='100%'>
                <Select value={value} onChange={onChangeFn} focusBorderColor='purple.300' variant='filled' placeholder={defaultValue}>
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