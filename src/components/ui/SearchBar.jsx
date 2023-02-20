import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export function SearchBar({value, onChangeFn}) {
    return (
        <InputGroup>
            <Input type='search' placeholder="Search bug!" value={value} onChange={onChangeFn} focusBorderColor='purple.300'/>
            <InputRightElement children={<FaSearch/>}/>
        </InputGroup>
    )
}