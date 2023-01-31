import { useEffect } from "react";
import { Link as RLink } from "react-router-dom";
import { Box, Button, Flex, Heading, HStack, Link, Text, useToast, VStack } from "@chakra-ui/react";
import { useAuthStore } from "../../hooks";
import { PasswordField, TextField } from "../../components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";

export function LoginPage() {

    const {errorMsg, startLogin} = useAuthStore();
    const toast = useToast();

    useEffect(() => {
        if(errorMsg !== null) toast({
            title: 'Oops...',
            description: errorMsg,
            status: 'error',
            duration: 5000,
            isClosable: true,
            variant: 'solid',
            position: 'top-right'
        })
    },[errorMsg]);

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={Yup.object({
                email: Yup.string().email('Not a valid email.').required('Email is required.'),
                password: Yup.string().required('Password is required.').min(6, 'Password should be longer than 6 characters.')
            })}
            onSubmit={(values, actions) => {
                startLogin(values);
                actions.resetForm();
            }}
        >
        {(formik) => (
            <VStack>
                <Flex
                    direction='column'
                    as='form'
                    bg='white'
                    border='1px solid gray.500'
                    borderRadius={8}
                    boxShadow='0 4px 5px 0 rgba(0, 0, 0, 0.5)'
                    py={4}
                    px={8}
                    w={{base: '300px', sm: '400px', md: '500px', xl: '600px'}}
                    onSubmit={formik.handleSubmit}
                >
                    <Heading as='h2' fontSize={30} my={4} textAlign='center'>Login</Heading>
                    
                    <TextField label='Email' name='email' placeholder='Your email' type='email' variant='flushed' icon={<FaEnvelope color='black'/>}/>

                    <PasswordField label='Password' name='password' placeholder='Your password' variant='flushed' icon={<FaLock/>}/>

                    <Button colorScheme='brand' type="submit">Login</Button>
                    <Text fontSize='sm' textAlign='center' my={2}>or</Text>
                    <Button colorScheme='secondary'>Use Demo Account</Button>

                    <Box w='100%' h={50} bg='transparent'></Box>

                    <HStack justify='space-between' fontSize={{base: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>
                        <Text my={4}>Don't have an account?</Text>
                        <Link as={RLink} to='signup' color='brand.600' fontWeight='bold'>Create one!</Link>
                    </HStack>
                </Flex>
                </VStack>
        )}
        </Formik>
    )
}