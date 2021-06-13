import { 
    Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, ModalBody, 
    Text, Button, SimpleGrid, Center
} from "@chakra-ui/react"

const AccountModal = ({ isOpen, onClose, logoutOfWeb3Modal, address }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody p="5">
                    <SimpleGrid columns="1" spacing="5">
                        <Center>
                            <Text fontSize="sm">{address}</Text>
                        </Center>
                        <Button
                            onClick={logoutOfWeb3Modal}
                            bg="orange"
                            >Disconnect</Button>
                    </SimpleGrid>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AccountModal;