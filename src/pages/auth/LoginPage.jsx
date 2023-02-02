import { useEffect } from "react";
import { Link as RLink } from "react-router-dom";
import { Button, Flex, Heading, HStack, Link, Text, useToast, VStack } from "@chakra-ui/react";
import { useAuthStore } from "../../hooks";
import { PasswordField, TextField } from "../../components";
import { Formik } from "formik";
import * as Yup from "yup";

export function LoginPage() {
    
    const actualTheme = localStorage.getItem('chakra-ui-color-mode');
    const {errorMsg, startLogin} = useAuthStore();
    const toast = useToast();

    function onDemoLogin() {
        startLogin({email: 'jhondoe@admin.com', password: 'adminPassword'})
    }

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
                    border='1px solid gray.500'
                    borderRadius={8}
                    bg={actualTheme === 'light' ? 'white' : '#1a202c'}
                    boxShadow='0 4px 5px 0 rgba(0, 0, 0, 0.5)'
                    py={4}
                    px={8}
                    w={{base: '300px', sm: '400px', md: '500px', xl: '600px'}}
                    onSubmit={formik.handleSubmit}
                >
                    <Heading as='h2' fontSize={30} my={4} textAlign='center'>Login</Heading>
                    
                    <TextField label='Email' name='email' placeholder='Your email' type='email' variant='filled'/>

                    <PasswordField label='Password' name='password' placeholder='Your password' variant='filled'/>

                    <Button colorScheme='purple' type="submit">Login</Button>
                    <Text fontSize='sm' textAlign='center' my={2}>or</Text>
                    <Button colorScheme='purple' onClick={onDemoLogin}>Use Demo Account</Button>


                    <HStack justify='space-between' my={4} fontSize={{base: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>
                        <Text my={4}>Don't have an account?</Text>
                        <Link as={RLink} to='signup' color='purple.500' fontWeight='bold'>Create one!</Link>
                    </HStack>
                </Flex>
                </VStack>
        )}
        </Formik>
    )
}