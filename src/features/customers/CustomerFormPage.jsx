import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm'; // Import PersonForm

const CustomerFormPage = ({ setActivePage, showNotification, customerToEdit, handleSaveCustomer }) => {
    const [formData, setFormData] = useState({});
    const [activeTab, setActiveTab] = useState('customerInfo');
    const isEditing = !!customerToEdit?.id;

    useEffect(() => {
        const initialData = customerToEdit || { customer: {}, coBorrower: {}, guarantor: {} };
        setFormData({ ...initialData, customer: initialData.customer || {}, coBorrower: initialData.coBorrower || {}, guarantor: initialData.guarantor || {}, });
    }, [customerToEdit]);

    const handleDataChange = (section) => (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
    };

    const handleSubmit = (e) => { e.preventDefault(); handleSaveCustomer(formData); };

    const TabButton = ({ tabName, label }) => (<button type="button" onClick={() => setActiveTab(tabName)} className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === tabName ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{label}</button>);

    return (
        <main className="flex-1 p-6 bg-gray-50 flex flex-col">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm flex-1 flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'កែសម្រួលព័ត៌មានអតិថិជន' : 'អតិថិជន / បន្ថែមថ្មី'}</h3>
                    <button type="button" onClick={() => setActivePage('customers')} className="text-gray-500 hover:text-gray-700"><i className="fa-solid fa-times text-xl"></i></button>
                </div>
                <div className="border-b"><nav className="flex flex-wrap gap-4 px-4"><TabButton tabName="customerInfo" label="ព័ត៌មានអតិថិជន" /><TabButton tabName="coBorrowerInfo" label="ព័ត៌មានអ្នករួមខ្ចី" /><TabButton tabName="guarantorInfo" label="ព័ត៌មានអ្នកធានា" /></nav></div>
                <div className="p-6 overflow-y-auto">
                    {activeTab === 'customerInfo' && <PersonForm personData={formData.customer || {}} onDataChange={handleDataChange('customer')} />}
                    {activeTab === 'coBorrowerInfo' && <PersonForm personData={formData.coBorrower || {}} onDataChange={handleDataChange('coBorrower')} />}
                    {activeTab === 'guarantorInfo' && <PersonForm personData={formData.guarantor || {}} onDataChange={handleDataChange('guarantor')} />}
                </div>
                <div className="p-4 border-t mt-auto">
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2">
                            <i className="fa-solid fa-floppy-disk mr-2"></i>{isEditing ? 'រក្សាទុកការផ្លាស់ប្តូរ' : 'រក្សាទុក'}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default CustomerFormPage;