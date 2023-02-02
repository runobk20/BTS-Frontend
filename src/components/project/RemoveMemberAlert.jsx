import { useEffect, useRef } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";
import { useProject } from "../../hooks";

export function RemoveMemberAlert(props) {
    const toast = useToast();
    const cancelRef = useRef();
    const {isOpen, onClose, projectId, member} = props;
    const {errorMsg, startRemoveMember} = useProject();

    function onRemoveMember() {
        const uid = member._id;
        startRemoveMember(projectId, {uid});
        onClose();
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
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Remove Member
            </AlertDialogHeader>

            <AlertDialogBody>
              {member ? `You want to remove ${member.role} ${member.name}?` : 'To remove a member, first click on their name in the member list' }
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {member ? 'Cancel' : 'Close'}
              </Button>
              {member && <Button colorScheme='danger' onClick={onRemoveMember} ml={3}>Delete</Button>}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
}