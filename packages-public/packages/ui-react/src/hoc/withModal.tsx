import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

import { getComponentDisplayName } from "./getComponentDisplayName.js";

export interface ModalProps {
    modalIsOpen: boolean;
    modalOnClose: () => void;
}
/**
 * Wrap component with Modal
 * @param ModalBody
 * @returns
 */
export function withModal<ModalHeaderProps, ModalBodyProps, ModalFooterProps>(
    ModalHeaderContent: (props: ModalHeaderProps) => JSX.Element,
    ModalBodyContent: (props: ModalBodyProps) => JSX.Element,
    ModalFooterContent: (props: ModalFooterProps) => JSX.Element,
) {
    const ModalWithContent = (props: ModalProps & ModalHeaderProps & ModalBodyProps & ModalFooterProps) => {
        const { modalIsOpen, modalOnClose } = props;
        return (
            <Modal isOpen={modalIsOpen} size="xl" onClose={modalOnClose}>
                <ModalOverlay />
                <ModalContent bg="card.bg" color="baseText">
                    <ModalHeader>
                        <ModalHeaderContent {...props} />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ModalBodyContent {...props} />
                    </ModalBody>
                    <ModalFooter>
                        <ModalFooterContent {...props} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };
    const modalHeaderName = getComponentDisplayName(ModalHeaderContent);
    const modalBodyName = getComponentDisplayName(ModalBodyContent);
    const modalFooterName = getComponentDisplayName(ModalFooterContent);
    ModalWithContent.displayName = `withModal(header: ${modalHeaderName} body: ${modalBodyName} footer: ${modalFooterName})`;
    return ModalWithContent;
}
