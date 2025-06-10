import React from 'react';
import { FormField, Input, Select } from '../../../components/common/FormComponents'; // Correct path to FormComponents

const PersonForm = ({ personData, onDataChange }) => {
    // FormInput and FormRow are internal to PersonForm here
    const FormInput = ({ label, name, type = 'text', children }) => (<div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-700">{label}</label>{children || <input type={type} name={name} value={personData[name] || ''} onChange={onDataChange} className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"/>}</div>);
    const FormRow = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>;
    return (
        <div className="flex flex-col gap-6">
            <FormRow>
                <FormInput name="name" label="ឈ្មោះ" />
                <FormInput name="latinName" label="ឈ្មោះជាឡាតាំង" />
                <FormInput name="gender" label="ភេទ">
                    <select name="gender" value={personData.gender || 'ប្រុស'} onChange={onDataChange} className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
                        <option value="ប្រុស">ប្រុស</option>
                        <option value="ស្រី">ស្រី</option>
                    </select>
                </FormInput>
            </FormRow>
            <FormRow>
                <FormInput name="phone" label="ទូរស័ព្ទ" />
                <FormInput name="idType" label="ប្រភេទឯកសារ">
                    <select name="idType" value={personData.idType || 'អត្តសញ្ញាណប័ណ្ណ'} onChange={onDataChange} className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
                        <option>អត្តសញ្ញាណប័ណ្ណ</option>
                        <option>លិខិតឆ្លងដែន</option>
                    </select>
                </FormInput>
                <FormInput name="idNumber" label="លេខប័ណ្ណសម្គាល់ខ្លួន" />
            </FormRow>
            <FormRow>
                <FormInput name="dob" label="ថ្ងៃខែឆ្នាំកំណើត" type="date" />
                <FormInput name="expiryDate" label="ថ្ងៃកាតផុតកំណត់" type="date" />
                <FormInput name="issuedBy" label="ចេញដោយ" />
            </FormRow>
            <FormRow>
                <FormInput name="institution" label="ស្ថាប័ន" />
                <FormInput name="job" label="មុខងារ" />
                <FormInput name="workplace" label="កន្លែងធ្វើការ" />
            </FormRow>
            <FormRow>
                <FormInput name="income" label="ចំណូល" type="number" />
                <FormInput name="expense" label="ចំណាយ" type="number" />
                <FormInput name="netIncome" label="នៅសល់សរុប" type="number" />
            </FormRow>
            <FormRow>
                <FormInput name="province" label="ខេត្ត/ក្រុង">
                    <select name="province" value={personData.province || 'ភ្នំពេញ'} onChange={onDataChange} className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
                        <option>ភ្នំពេញ</option>
                    </select>
                </FormInput>
                <FormInput name="district" label="ស្រុក/ខណ្ឌ">
                    <select name="district" value={personData.district || 'ដូនពេញ'} onChange={onDataChange} className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
                        <option>ដូនពេញ</option>
                    </select>
                </FormInput>
                <FormInput name="commune" label="ឃុំ/សង្កាត់">
                    <select name="commune" value={personData.commune || 'ផ្សារថ្មី ១'} onChange={onDataChange} className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
                        <option>ផ្សារថ្មី ១</option>
                    </select>
                </FormInput>
            </FormRow>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="address" label="អាស័យដ្ឋានលម្អិត" />
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">រូបភាព</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                        <i className="fa-solid fa-upload text-gray-400 text-3xl"></i>
                        <p className="text-sm text-gray-500 mt-2">Browse file</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PersonForm;