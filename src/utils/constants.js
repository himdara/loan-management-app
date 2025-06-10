import React from 'react';

export const navItems = [
    { name: 'ផ្ទាំងគ្រប់គ្រង', icon: <i className="fa-solid fa-house"></i>, page: 'dashboard', hasSubmenu: false },
    { name: 'ទំនាក់ទំនង', icon: <i className="fa-solid fa-address-book"></i>, hasSubmenu: true, submenu: [ { name: 'អតិថិជន', page: 'customers' }, { name: 'មន្ត្រីឥណទាន', page: 'credit-officers' }, { name: 'ប្រភេទឯកសារ', page: 'document-types' }, { name: 'ទ្រព្យធានា', page: 'collaterals' }, ] },
    { icon: <i className="fa-solid fa-file-circle-plus"></i>, name: 'ស្នើសុំកម្ចី', hasSubmenu: true, submenu: [
        { name: 'បង្កើតកម្ចីថ្មី', page: 'create-loan' },
        { name: 'បញ្ជីកម្ចី', page: 'loan-list' },
        { name: 'បញ្ជីអតិថិជនខូច', page: 'defaulter-list' },
        { name: 'បញ្ជីមិនទាន់អនុញ្ញាត', page: 'pending-list' },
        { name: 'ទ្រព្យអតិថិជនធានា', page: 'customer-collateral-list' }
    ] },
    { icon: <i className="fa-solid fa-landmark"></i>, name: 'ការទូទាត់របស់អតិថិជន', hasSubmenu: true, submenu: [ { name: 'ការទូទាត់របស់អតិថិជន', page: 'customer-payments' }, { name: 'បញ្ជីបង់ប្រាក់ប្រចាំថ្ងៃ', page: 'daily-payments' }, ] },
    { icon: <i className="fa-solid fa-file-pen"></i>, name: 'របាយការណ៍', hasSubmenu: true, submenu: [ { name: 'របាយការណ៍ប្រចាំថ្ងៃ', page: 'daily-report' }, { name: 'របាយការណ៍នៅជំពាក់', page: 'due-report' }, ] },
    { icon: <i className="fa-solid fa-chart-column"></i>, name: 'គណនេយ្យ', hasSubmenu: true, submenu: [ { name: 'បញ្ជីចំណាយ', page: 'expense-list' }, { name: 'បញ្ជីចំណូល', page: 'income-list' }, ] },
    { icon: <i className="fa-solid fa-chart-pie"></i>, name: 'របាយការណ៍ហិរញ្ញវត្ថុ', hasSubmenu: true, submenu: [ { name: 'លំហូរសាច់ប្រាក់', page: 'cash-flow' }, { name: 'ចំណេញ / ខាតសុទ្ធ', page: 'profit-loss' }, ] },
    { icon: <i className="fa-solid fa-gear"></i>, name: 'ការកំណត់', hasSubmenu: true, submenu: [ { name: 'ក្រុមហ៊ុន', page: 'company-settings' }, { name: 'អ្នកគ្រប់គ្រងអ្នកប្រើប្រាស់', page: 'user-management' }, ] },
];

export const pageTitles = {
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    customers: 'អតិថិជន',
    'customers-create': 'អតិថិជន / បន្ថែមថ្មី',
    'customers-edit': 'កែសម្រួលព័ត៌មានអតិថិជន',
    'credit-officers': 'មន្ត្រីឥណទាន',
    'credit-officers-create': 'មន្ត្រីឥណទាន / បន្ថែមថ្មី',
    'credit-officers-edit': 'កែសម្រួលព័ត៌មានមន្ត្រីឥណទាន',
    'document-types': 'ប្រភេទឯកសារ',
    'collaterals': 'ទ្រព្យធានា',
    'collaterals-create': 'ទ្រព្យធានា / បន្ថែមថ្មី',
    'collaterals-edit': 'កែសម្រួលទ្រព្យធានា',
    'create-loan': 'បង្កើតកម្ចីថ្មី',
    'loan-list': 'បញ្ជីកម្ចី',
    'defaulter-list': 'បញ្ជីអតិថិជនខូច',
    'pending-list': 'បញ្ជីមិនទាន់អនុញ្ញាត',
    'customer-collateral-list': 'ទ្រព្យអតិថិជនធានា',
};

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];