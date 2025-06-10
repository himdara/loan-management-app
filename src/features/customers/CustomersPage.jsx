import React, { useState } from 'react';
import { Input } from '../../components/common/FormComponents'; // Import Input
import CustomerDetailModal from './CustomerDetailModal'; // Import CustomerDetailModal
import ConfirmationModal from '../../components/common/ConfirmationModal'; // Import ConfirmationModal

const CustomersPage = ({ customerData, setCustomerData, handleEdit, showNotification }) => {
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleViewDetails = (customer) => { setSelectedCustomer(customer); setDetailModalOpen(true); };
    const handleCloseDetailModal = () => { setDetailModalOpen(false); setSelectedCustomer(null); };

    const handleDeleteClick = (customer) => { setSelectedCustomer(customer); setDeleteModalOpen(true); };
    const handleCloseDeleteModal = () => { setDeleteModalOpen(false); setSelectedCustomer(null); };

    const confirmDelete = () => {
        setCustomerData(customerData.filter(c => c.id !== selectedCustomer.id));
        showNotification(`អតិថិជន "${selectedCustomer.customer.name}" ត្រូវបានលុបสำเร็จ`, 'success');
        handleCloseDeleteModal();
    };

    const tableHeaders = ["#", "ឈ្មោះ", "ឈ្មោះជាអក្សរឡាតាំង", "ភេទ", "ទូរស័ព្ទ", "ប្រភេទបណ្ណសម្គាល់ខ្លួន", "លេខបណ្ណសម្គាល់ខ្លួន", "ថ្ងៃខែឆ្នាំកំណើត", "សកម្មភាព"];

    return (
        <main className="flex-1 p-6 bg-gray-50 flex flex-col">
            <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b gap-3">
                    <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">បញ្ជីអតិថិជន</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full sm:w-auto"><Input type="text" placeholder="ស្វែងរក..." className="border rounded-lg py-2 pl-4 pr-10 text-sm w-full sm:w-64"/><i className="fa-solid fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i></div>
                        <button onClick={() => handleEdit(null)} className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-600 flex items-center gap-2 w-full sm:w-auto justify-center whitespace-nowrap"><i className="fa-solid fa-plus"></i> បង្កើតថ្មី</button>
                    </div>
                </div>
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left">
                        <thead><tr>{tableHeaders.map((header) => (<th key={header} scope="col" className="sticky top-0 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50 z-10 whitespace-nowrap">{header}</th>))}</tr></thead>
                        <tbody className="divide-y divide-gray-200">
                            {customerData.map((customerRecord, index) => (
                                <tr key={customerRecord.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{customerRecord.customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{customerRecord.customer.latinName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{customerRecord.customer.gender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{customerRecord.customer.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{customerRecord.customer.idType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{customerRecord.customer.idNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{customerRecord.customer.dob}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleViewDetails(customerRecord)} className="text-blue-600 hover:text-blue-800" title="មើលលម្អិត"><i className="fa-solid fa-eye fa-fw"></i></button>
                                            <button onClick={() => handleEdit(customerRecord)} className="text-amber-500 hover:text-amber-700" title="កែសម្រួល"><i className="fa-solid fa-pen-to-square fa-fw"></i></button>
                                            <button onClick={() => handleDeleteClick(customerRecord)} className="text-red-600 hover:text-red-800" title="លុប"><i className="fa-solid fa-trash fa-fw"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CustomerDetailModal customer={selectedCustomer} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={confirmDelete}
                title="បញ្ជាក់ការលុប"
                message={`តើអ្នកពិតជាចង់លុបអតិថិជន "${selectedCustomer?.customer.name}" មែនទេ?`}
            />
        </main>
    );
};

export default CustomersPage;