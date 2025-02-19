import { createContext, useContext, useState } from 'react';
import ModalContext from './modalContext';

import LoginModal         from '../components/modals/auth/LoginModal';
import CreateAccountModal from '../components/modals/auth/CreateAccountModal';
import AddEntryModal      from '../components/modals/AddEntryModal';
import EditEntryModal     from '../components/modals/EditEntryModal';
import DeleteEntryModal   from '../components/modals/DeleteEntryModal';


const ModalContextProvider = ({ children }) => {
	const [openModal, setOpenModal] = useState(null);
	const [label, setLabel] = useState('');
	const [entry, setEntry] = useState({});
  
	const handleOpenAddEntry = (label) => {
		setLabel(label); 
		setOpenModal('addEntry');
	};
	const handleCloseAddEntry = () => {
		setLabel(''); 
		setOpenModal('');
	};

	const handleOpenEditEntry = (label, entry) => {
		console.log(label);
		console.log(entry);
		setLabel(label);
		setEntry(entry);
		setOpenModal('editEntry');
	};
	const handleCloseEditEntry = () => {
		setLabel('');
		setEntry({}); 
		setOpenModal('');
	};

	const handleOpenDeleteEntry = (label,entry) => {
		setLabel(label);
		setEntry(entry); 
		setOpenModal('deleteEntry');
	};

	const handleCloseDeleteEntry = () => {
		setLabel('');
		setEntry({});
		setOpenModal('');
	};
  
	return (
		<ModalContext.Provider value={{
			openModal,
			handleOpenAddEntry,
			handleCloseAddEntry,
			handleOpenEditEntry,
			handleCloseEditEntry,
			handleOpenDeleteEntry,
			handleCloseDeleteEntry
		}}>
		<AddEntryModal
			open={openModal === 'addEntry'}
			label={label}
			handleCloseAddEntry={handleCloseAddEntry} 
		/>
		<EditEntryModal 
			open={openModal === 'editEntry'} 
			label={label}
			entry={entry}
			handleCloseEditEntry={handleCloseEditEntry} 
		/>
		<DeleteEntryModal 
			open={openModal === 'deleteEntry'} 
			entry={entry}
			handleCloseDeleteEntry={handleCloseDeleteEntry} 
		/>

		{children}
	  	</ModalContext.Provider>
	);
};

export default ModalContextProvider;
  