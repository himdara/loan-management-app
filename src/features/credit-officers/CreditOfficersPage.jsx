import React, { useState, useEffect } from 'react';
import { FormField, Input, Select } from '../../components/common/FormComponents'; // Import reusable form components

const CreditOfficerFormPage = ({ setActivePage, showNotification, officerToEdit, handleSaveOfficer }) => {
    const [officerData, setOfficerData] = useState({});
    const isEditing = !!officerToEdit?.id;

    useEffect(() => {
        // Use officerToEdit if available, otherwise initialize with defaults
        setOfficerData(officerToEdit || { id: `SN-CO-${Date.now().toString().slice(-6)}`, gender: 'ប្រុស', status: 'active' });
    }, [officerToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOfficerData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!officerData.name || !officerData.id || !officerData.phone) {
            showNotification('សូមបំពេញគ្រប់ប្រអប់ដែលមានសញ្ញា *', 'error');
            return;
        }
        handleSaveOfficer(officerData);
    };

    const FormRow = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>;

    return (
        <main className="flex-1 p-6 bg-gray-50 flex flex-col">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm flex-1 flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'កែសម្រួលព័ត៌មានមន្ត្រីឥណទាន' : 'មន្ត្រីឥណទាន / បន្ថែមថ្មី'}</h3>
                    <button type="button" onClick={() => setActivePage('credit-officers')} className="text-gray-500 hover:text-gray-700"><i className="fa-solid fa-times text-xl"></i></button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex flex-col gap-6">
                        <FormRow>
                            <FormField name="id" label="អត្តលេខ" required={true}><Input name="id" value={officerData['id'] || ''} onChange={handleChange} /></FormField>
                            <FormField name="name" label="ឈ្មោះ" required={true}><Input name="name" value={officerData['name'] || ''} onChange={handleChange} /></FormField>
                            <FormField name="gender" label="ភេទ"><Select name="gender" value={officerData.gender || 'ប្រុស'} onChange={handleChange}><option value="ប្រុស">ប្រុស</option><option value="ស្រី">ស្រី</option></Select></FormField>
                        </FormRow>
                        <FormRow>
                            <FormField label="ថ្ងៃខែឆ្នាំកំណើត"><Input type="date" name="dob" value={officerData.dob || ''} onChange={handleChange} /></FormField>
                            <FormField label="ថ្ងៃចូលធ្វើការ"><Input type="date" name="startDate" value={officerData.startDate || ''} onChange={handleChange} /></FormField>
                            <FormField label="លេខទំនាក់ទំនង" required={true}><Input name="phone" value={officerData.phone || ''} onChange={handleChange} /></FormField>
                        </FormRow>
                        <FormRow>
                            <div className="md:col-span-2"><FormField label="អាស័យដ្ឋាន"><Input name="address" value={officerData.address || ''} onChange={handleChange} /></FormField></div>
                            <FormField label="ស្ថានភាព"><Select name="status" value={officerData.status || 'active'} onChange={handleChange}><option value="active">សកម្ម</option><option value="inactive">អសកម្ម</option></Select></FormField>
                        </FormRow>
                    </div>
                </div>
                <div className="p-4 border-t mt-auto">
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2">
                            <i className="fa-solid fa-floppy-disk mr-2"></i> {isEditing ? 'រក្សាទុកការផ្លាស់ប្តូរ' : 'រក្សាទុក'}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default CreditOfficerFormPage;