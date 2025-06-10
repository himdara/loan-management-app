import React, { useState } from 'react';
import { Input } from '../../components/common/FormComponents'; // Import Input
import ConfirmationModal from '../../components/common/ConfirmationModal'; // Import ConfirmationModal

const DocumentTypesPage = ({ docTypeData, setDocTypeData, handleOpenModal, showNotification }) => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDocType, setSelectedDocType] = useState(null);

    const handleDeleteClick = (docType) => {
        setSelectedDocType(docType);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setDocTypeData(prevData => prevData.filter(c => c.id !== selectedDocType.id));
        showNotification(`ប្រភេទ "${selectedDocType.name}" ត្រូវបានលុបជោគជ័យ`, 'success');
        setDeleteModalOpen(false);
        setSelectedDocType(null);
    };

    const tableHeaders = ["ល.រ", "ប្រភេទឯកសារ", "ការពិពណ៌នា", "សកម្មភាព"];

    return (
        <main className="flex-1 p-6 bg-gray-50 flex flex-col">
            <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b gap-3">
                    <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">បញ្ជីប្រភេទឯកសារ</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full sm:w-auto"><Input type="text" placeholder="ស្វែងរក..." /><i className="fa-solid fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i></div>
                        <button onClick={() => handleOpenModal(null)} className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-600 flex items-center gap-2 w-full sm:w-auto justify-center whitespace-nowrap"><i className="fa-solid fa-plus"></i> បង្កើតថ្មី</button>
                    </div>
                </div>
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left">
                        <thead><tr>{tableHeaders.map((header) => (<th key={header} scope="col" className="sticky top-0 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50 z-10 whitespace-nowrap">{header}</th>))}</tr></thead>
                        <tbody className="divide-y divide-gray-200">
                            {docTypeData.map((docType, index) => (
                                <tr key={docType.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{docType.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap max-w-md truncate">{docType.purpose || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleOpenModal(docType)} className="text-amber-500 hover:text-amber-700" title="កែសម្រួល"><i className="fa-solid fa-pen-to-square fa-fw"></i></button>
                                            <button onClick={() => handleDeleteClick(docType)} className="text-red-600 hover:text-red-800" title="លុប"><i className="fa-solid fa-trash fa-fw"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={confirmDelete} title="បញ្ជាក់ការលុប" message={`តើអ្នកពិតជាចង់លុប "${selectedDocType?.name}" មែនទេ?`} />
        </main>
    );
};

export default DocumentTypesPage;