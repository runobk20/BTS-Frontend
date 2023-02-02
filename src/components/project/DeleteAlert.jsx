import { useEffect, useRef } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";
import { useProject } from "../../hooks";

export function DeleteAlert(props) {
    const {startDeleteProject, errorMsg} = useProject();
    const {isOpen, onClose, projectId} = props;
    const cancelRef = useRef();
    const toast = useToast();

    function onDeleteProject() {
        startDeleteProject(projectId);

        toast({
          title: 'Success',
          description: 'Project deleted, you are being redirected',
          status: 'success',
          duration: 5000,
          isClosable: true,
          variant: 'solid',
          position: 'top-right'
      })
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
    }, [errorMsg]);

    return (
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='danger' onClick={onDeleteProject} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
}