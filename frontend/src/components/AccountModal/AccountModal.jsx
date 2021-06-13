import { 
    Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, ModalBody, 
    Text, Button, SimpleGrid, Center
} from "@chakra-ui/react"

const AccountModal = ({ isOpen, onClose, logoutOfWeb3Modal, address }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text fontSize="sm">{address}</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody p="5">
                    <Button
                        isFullWidth={true}
                        onClick={logoutOfWeb3Modal}
                        bg="orange"
                        >Disconnect</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AccountModal;