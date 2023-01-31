import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";


export function AuthLayout() {
	let vh = window.innerHeight * 0.01;
	
	return (
		<Flex
			h={`calc((${vh}px, 1vh) * 100)`}
			bgGradient="linear(to-tr, secondary.400, secondary.500, brand.400, brand.500 ,brand.700)"
			justifyContent="center"
			direction="column"
		>
            <Outlet/>
        </Flex>
	);
}
