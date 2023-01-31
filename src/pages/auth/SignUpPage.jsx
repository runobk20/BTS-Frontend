import { useEffect } from "react";
import { Link as RLink } from "react-router-dom";
import { Box, Button, Flex, Heading, HStack, Link, Text, useToast, VStack } from "@chakra-ui/react";
import { useAuthStore } from "../../hooks";
import { Formik } from "formik";
import { PasswordField, TextField, SelectField } from "../../components";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import * as Yup from "yup";


export function SignUpPage() {

    const {errorMsg, startRegister} = useAuthStore();
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
            initialValues={{name: '', email: '', password: '', confirmPassword: '', role: ''}}
            validationSchema={Yup.object({
                name: Yup.string().required('name is required').min(6, 'name should be longer than 6 characters.'),
                email: Yup.string().email('Not a valid email.').required('Email is required.'),
                password: Yup.string().required('Password is required.').min(6, 'Password should be longer than 6 characters.'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('You have to confirm your password'),
                role: Yup.string().required('Role is required')
            })}
            onSubmit={(values, actions) => {
                const {confirmPassword, ...newValues} = values;
                startRegister(newValues);
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
                    <Heading as='h2' fontSize={30} my={4} textAlign='center'>Sign Up</Heading>
                    
                    <TextField label='Full name' name='name' placeholder='Your name' variant='flushed' icon={<FaUser color='black'/>}/>
                    <TextField label='Email' name='email' placeholder='Your email' type='email' variant='flushed' icon={<FaEnvelope color='black'/>}/>

                    <PasswordField label='Password' name='password' placeholder='Your password' variant='flushed' icon={<FaLock/>}/>
                    <PasswordField label='Confirm password' name='confirmPassword' placeholder='Confirm your password' variant='flushed' icon={<FaLock/>}/>
                    <SelectField label='Role' name='role' placeholder='Select option' options={[{tester: 'Tester'}, {developer: 'Developer'}]}/>

                    <Button colorScheme='brand' type="submit">Create Account</Button>

                    <Box w='100%' h={50} bg='transparent'></Box>

                    <HStack justify='space-between' fontSize={{base: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>
                        <Text my={4}>Already have an account?</Text>
                        <Link as={RLink} to='/' color='brand.600' fontWeight='bold'>Log in!</Link>
                    </HStack>
                </Flex>
                </VStack>
        )}
        </Formik>
    )
}