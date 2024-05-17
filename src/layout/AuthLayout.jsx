import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";


export function AuthLayout() {
	let vh = window.innerHeight * 0.01;
	
	return (
		<Flex
			minH='100vh'
			bgGradient="linear(to-tr, purple.300, purple.500, purple.800)"
			justifyContent="center"
			direction="column"
		>
            <Outlet/>
        </Flex>
	);
}
