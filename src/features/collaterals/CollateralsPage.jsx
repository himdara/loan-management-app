import React, { useState, useEffect } from 'react';
import { FormField, Input, Select } from '../../components/common/FormComponents'; // Import reusable form components

const CollateralFormPage = ({ setActivePage, showNotification, collateralToEdit, handleSaveCollateral, docTypeData }) => {
    const [formData, setFormData] = useState({});
    const isEditing = !!collateralToEdit?.id;

    useEffect(() => {
        setFormData(collateralToEdit || { docTypeId: docTypeData.length > 0 ? docTypeData[0].id : '', purpose: '', estimatedValue: '' });
    }, [collateralToEdit, docTypeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.docTypeId || !formData.estimatedValue) {
            showNotification('សូមជ្រើសរើសប្រភេទ និងបញ្ចូលតំលៃប៉ាន់ស្មាន', 'error');
            return;
        }
        handleSaveCollateral(formData);
    };

    return (
        <main className="flex-1 p-6 bg-gray-50 flex flex-col">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm flex-1 flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'កែសម្រួលទ្រព្យធានា' : 'ទ្រព្យធានា / បន្ថែមថ្មី'}</h3>
                    <button type="button" onClick={() => setActivePage('collaterals')} className="text-gray-500 hover:text-gray-700"><i className="fa-solid fa-times text-xl"></i></button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <FormField label="ប្រភេទ">
                            <Select name="docTypeId" value={formData.docTypeId || ''} onChange={handleChange}>
                                <option value="" disabled>-- ជ្រើសរើសប្រភេទ --</option>
                                {docTypeData.map(doc => <option key={doc.id} value={doc.id}>{doc.name}</option>)}
                            </Select>
                        </FormField>
                        <FormField label="គោលបំណង">
                            <Input type="text" name="purpose" value={formData.purpose || ''} onChange={handleChange} placeholder="ការពិពណ៌នា..." />
                        </FormField>
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">តំលៃប៉ាន់ស្មាន</label>
                            <Input type="number" name="estimatedValue" value={formData.estimatedValue || ''} onChange={handleChange} placeholder="0.00" />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6 max-w-4xl mx-auto w-full">
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2">
                            <i className="fa-solid fa-save"></i> {isEditing ? 'រក្សាទុកការផ្លាស់ប្តូរ' : 'រក្សាទុក'}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default CollateralFormPage;