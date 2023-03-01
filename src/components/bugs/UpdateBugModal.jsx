import { useEffect } from "react";
import { useBugStore } from "../../hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, VStack } from "@chakra-ui/react";
import { SelectField, TextareaField, TextField } from "../form";
import { priorityOptions, severityOptions, statusOptions } from "../../data/bugData";

export function UpdateBugModal({isOpen, onClose, bug}) {
    const {errorMsg, startUpdateBug} = useBugStore();
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
                title: bug.title,
                description: bug.description,
                severity: bug.severity,
                priority: bug.priority,
                stepsToRep: bug.stepsToRep,
                actualResult: bug.actualResult,
                expectedResult: bug.expectedResult,
                status: bug.status
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('Title is required'),
                description: Yup.string().required('Description is required'),
                severity: Yup.string().required('Severity is required'),
                priority: Yup.string().required('Priority is required'),
                status: Yup.string().required('Status is required'),
                stepsToRep: Yup.string().required('The steps to reproduce are required'),
                actualResult: Yup.string().required('The actual result is required'),
                expectedResult: Yup.string().required('The expected result is required')
            })}
            onSubmit={(values) => {
                startUpdateBug(bug.id || bug._id, values);
                onClose();
            }}
        >
        {(formik) => (
        <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
            <ModalOverlay/>
            <ModalContent>
            <ModalHeader>Update Bug</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <VStack>
                <Flex as='form' direction='column' w='100%' onSubmit={formik.handleSubmit}>
                    <TextField label='Title' name='title' placeholder='Bug title' variant='filled'/>
                    <TextField label='Description' name='description' placeholder='Bug description' variant='filled'/>
                    <Flex gap={3}>
                    <SelectField label='Severity' name='severity' placeholder='Select option' variant='filled' options={severityOptions}/>
                    <SelectField label='Priority' name='priority' placeholder='Select option' variant='filled' options={priorityOptions}/>
                    <SelectField label='Status' name='status' placeholder='Select option' variant='filled' options={statusOptions}/>
                    </Flex>
                    <TextareaField label='Steps to reproduce' name='stepsToRep' placeholder='Tell us how to get that bug' variant='filled'/>
                    <TextareaField label='Actual result' name='actualResult' placeholder='What was the result?' variant='filled'/>
                    <TextareaField label='Expected result' name='expectedResult' placeholder='What you expected to happen?' variant='filled'/>

                    <Flex justify='end' gap={3}>
                        <Button onClick={() => onClose()}>Cancel</Button>
                        <Button type="submit" colorScheme='purple'>Update</Button>
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