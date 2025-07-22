'use client';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import StatusSelector from './StatusSelector';
import { STATUSES_TO_SHOW } from '@/data/statusdata';
import { useState } from 'react';

export default function StatusModal({ openModal, onClose, status, updateMonsterStatus }) {
    const [selectedStatusIds, setSelectedStatusIds] = useState([]);

    // Met à jour les IDs depuis le StatusSelector
    const handleStatusChange = ids => {
        setSelectedStatusIds(ids);
        console.log(selectedStatusIds);
    };

    const handleAccept = () => {
        const selectedStatuses = STATUSES_TO_SHOW.filter(status =>
            selectedStatusIds.includes(status.id),
        );
        updateMonsterStatus(selectedStatuses);
        onClose();
    };

    return (
        <Modal dismissible show={openModal} onClose={onClose}>
            <ModalHeader className="items-center bg-gray-800">
                <span className="block w-full font-semibold text-white">Éditer le Monstre</span>
            </ModalHeader>
            <ModalBody>
                <StatusSelector status={status} handleStatusChange={handleStatusChange} />
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleAccept}>Accepter</Button>
                <Button color="alternative" onClick={onClose}>
                    Annuler
                </Button>
            </ModalFooter>
        </Modal>
    );
}
