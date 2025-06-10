import React, { useState } from 'react';
import Modal from '../../components/common/Modal'; // Import Modal

const CustomerDetailModal = ({ customer, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('customerInfo');
    const TabButton = ({ tabName, label }) => (<button onClick={() => setActiveTab(tabName)} className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === tabName ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{label}</button>);
    const DetailItem = ({ label, value }) => (<div className="py-1"><p className="text-sm font-semibold text-gray-700">{label}</p><p className="text-sm text-gray-600">{value || '-'}</p></div>);

    if (!customer) return null;

    const displayData = (data) => (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 flex flex-col items-center gap-4"><div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center"><i className="fa-solid fa-image text-4xl text-gray-400"></i></div></div>
            <div className="w-full md:w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2">
                <DetailItem label="ឈ្មោះ" value={data.name} />
                <DetailItem label="ភេទ" value={data.gender} />
                <DetailItem label="ទូរស័ព្pt" value={data.phone} />
                <DetailItem label="ថ្ងៃខែឆ្នាំកំណើត" value={data.dob} />
                <DetailItem label="ប្រភេទប័ណ្ណ" value={data.idType} />
                <DetailItem label="លេខប័ណ្ណ" value={data.idNumber} />
                <DetailItem label="ថ្ងៃប័ណ្ណផុតកំណត់" value={data.expiryDate} />
                <DetailItem label="ចេញដោយ" value={data.issuedBy} />
                <DetailItem label="មុខងារ" value={data.job} />
                <DetailItem label="កន្លែងធ្វើការ" value={data.institution} />
                <DetailItem label="ចំណូល" value={data.income ? `$${data.income}`: '-'} />
                <DetailItem label="ចំណាយ" value={data.expense ? `$${data.expense}`: '-'} />
                <div className="lg:col-span-2"><DetailItem label="អាស័យដ្ឋាន" value={data.address} /></div>
            </div>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="បង្ហាញព័ត៌មាន" maxWidth="max-w-4xl">
            <div className="border-b"><nav className="flex flex-wrap gap-4 px-4"><TabButton tabName="customerInfo" label="ព័ត៌មានអតិថិជន" /><TabButton tabName="coBorrowerInfo" label="ព័ត៌មានអ្នករួមខ្ចី" /><TabButton tabName="guarantorInfo" label="ព័ត៌មានអ្នកធានា" /></nav></div>
            <div className="p-6 overflow-y-auto">
                <div className="min-h-[350px]">
                    {activeTab === 'customerInfo' && displayData(customer.customer)}
                    {activeTab === 'coBorrowerInfo' && (customer.coBorrower && Object.keys(customer.coBorrower).length > 0 ? displayData(customer.coBorrower) : <div className="flex items-center justify-center h-full text-gray-500">មិនមានព័ត៌មានអ្នករួមខ្ចីទេ។</div>)}
                    {activeTab === 'guarantorInfo' && (customer.guarantor && Object.keys(customer.guarantor).length > 0 ? displayData(customer.guarantor) : <div className="flex items-center justify-center h-full text-gray-500">មិនមានព័ត៌មានអ្នកធានាទេ។</div>)}
                </div>
            </div>
            <div className="p-4 border-t mt-auto flex justify-end">
                <button onClick={onClose} className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-600">បិទ</button>
            </div>
        </Modal>
    );
};

export default CustomerDetailModal;