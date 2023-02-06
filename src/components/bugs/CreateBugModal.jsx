import { useEffect } from "react";
import { useBugStore } from "../../hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, VStack } from "@chakra-ui/react";
import { SelectField, TextareaField, TextField } from "../form";
import { priorityOptions, severityOptions } from "../../data/bugData";

export function CreateBugModal({isOpen, onClose, projectId}) {
    const {startCreateBug, errorMsg} = useBugStore();
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
            initialValues={{
                title: '',
                description: '',
                severity: '',
                priority: '',
                stepsToRep: '',
                actualResult: '',
                expectedResult: '',
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('Title is required'),
                description: Yup.string().required('Description is required'),
                severity: Yup.string().required('Severity is required'),
                priority: Yup.string().required('Priority is required'),
                stepsToRep: Yup.string().required('The steps to reproduce are required'),
                actualResult: Yup.string().required('The actual result is required'),
                expectedResult: Yup.string().required('The expected result is required')
            })}
            onSubmit={(values) => {
                const date = new Date()
                const bugData = {
                    ...values,
                    date,
                    project: projectId,
                    status: 'New'
                }
                startCreateBug(bugData, projectId);
            }}
        >
        {(formik) => (
        <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
            <ModalOverlay/>
            <ModalContent>
            <ModalHeader>Create Bug</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <VStack>
                <Flex as='form' direction='column' w='100%' onSubmit={formik.handleSubmit}>
                    <TextField label='Title' name='title' placeholder='Bug title' variant='filled'/>
                    <TextField label='Description' name='description' placeholder='Bug description' variant='filled'/>
                    <Flex gap={3}>
                    <SelectField label='Severity' name='severity' placeholder='Select option' variant='filled' options={severityOptions}/>
                    <SelectField label='Priority' name='priority' placeholder='Select option' variant='filled' options={priorityOptions}/>
                    </Flex>
                    <TextareaField label='Steps to reproduce' name='stepsToRep' placeholder='Tell us how to get that bug' variant='filled'/>
                    <TextareaField label='Actual result' name='actualResult' placeholder='What was the result?' variant='filled'/>
                    <TextareaField label='Expected result' name='expectedResult' placeholder='What you expected to happen?' variant='filled'/>

                    <Flex justify='end' gap={3}>
                        <Button onClick={() => onClose()}>Cancel</Button>
                        <Button type="submit" colorScheme='purple'>Create</Button>
                    </Flex>
                </Flex>
                </VStack>
            </ModalBody>
            </ModalContent>
            </Modal>
        )}

        </Formik>
    )
}