import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Notification from './components/common/Notification';
import DocumentTypeFormModal from './features/document-types/DocumentTypeFormModal';
import DashboardPage from './features/dashboard/DashboardPage';
import CustomersPage from './features/customers/CustomersPage';
import CustomerFormPage from './features/customers/CustomerFormPage';
import CreditOfficersPage from './features/credit-officers/CreditOfficersPage';
import CreditOfficerFormPage from './features/credit-officers/CreditOfficerFormPage';
import DocumentTypesPage from './features/document-types/DocumentTypesPage';
import CollateralsPage from './features/collaterals/CollateralsPage';
import CollateralFormPage from './features/collaterals/CollateralFormPage';
import CreateLoanPage from './features/loans/CreateLoanPage';
import LoanListPage from './features/loans/LoanListPage';
import { navItems, pageTitles } from './utils/constants';

export default function App() {
    const [isMobileOpen, setMobileOpen] = useState(false);
    const [isDesktopCollapsed, setDesktopCollapsed] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');
    const [notification, setNotification] = useState({ message: '', type: '', show: false });

    // Customer State
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [customerData, setCustomerData] = useState([
        { id: 1, customer: { id: 101, name: 'ឆន សុវណ្ណរតនា', latinName: 'Chhon Sovanratana', gender: 'ប្រុស', phone: '012 345 678', idType: 'អត្តសញ្ញាណប័ណ្ណ', idNumber: '123456789', dob: '1990-01-01', job: 'Developer', institution: 'Google', income: 2000, expense: 500, expiryDate: '2030-01-01', issuedBy: 'មហាផ្ទៃ', address: 'ផ្ទះលេខ 123, ផ្លូវ 456, សង្កាត់បឹងកេងកង, ខណ្ឌបឹងកេងកង, ភ្នំពេញ' }, coBorrower: { id: 102, name: 'រតនា សុជាតា', latinName: 'Ratana Socheata', gender: 'ស្រី', phone: '012 111 222', idType: 'អត្តសញ្ញាណប័ណ្ណ', idNumber: '987654321', dob: '1992-02-02', job: 'Manager', institution: 'Microsoft', income: 2500, expense: 600, expiryDate: '2032-02-02', issuedBy: 'មហាផ្ទៃ', address: 'ផ្ទះលេខ 123, ផ្លូវ 456, សង្កាត់បឹងកេងកង, ខណ្ឌបឹងកេងកង, ភ្នំពេញ' }, guarantor: {}, },
        { id: 2, customer: { id: 201, name: 'កែវ មាលា', latinName: 'Keo Mala', gender: 'ស្រី', phone: '098 765 432', idType: 'លិខិតឆ្លងដែន', idNumber: '987654321', dob: '1995-05-15', job: 'Designer', institution: 'Facebook', income: 1800, expense: 400, expiryDate: '2028-05-15', issuedBy: 'អន្តោប្រវេសន៍', address: 'ផ្ទះលេខ 45, ផ្លូវ 111, សង្កាត់ទន្លេបាសាក់, ខណ្ឌចំការមន, ភ្នំពេញ' }, coBorrower: {}, guarantor: { id: 202, name: 'មាលា សុខុម', latinName: 'Mala Sokhom', gender: 'ប្រុស', phone: '098 333 444', idType: 'អត្តសញ្ញាណប័ណ្ណ', idNumber: '555444333', dob: '1994-04-04', job: 'Accountant', institution: 'Apple', income: 1900, expense: 450, expiryDate: '2029-04-04', issuedBy: 'មហាផ្ទៃ', address: 'ផ្ទះលេខ 78, ផ្លូវ 222, សង្កាត់ទួលទំពូង, ខណ្ឌចំការមន, ភ្នំពេញ' }, },
        { id: 3, customer: {id: 103, name: 'យ៉ា', latinName: 'Ya', gender: 'ប្រុស', phone: '015 999 888'}},
    ]);

    // Credit Officer State
    const [editingOfficer, setEditingOfficer] = useState(null);
    const [creditOfficerData, setCreditOfficerData] = useState([
        { id: 'SN-CO-000003', name: 'ហ៊ឹម តារា', gender: 'ប្រុស', dob: '2000-09-29', phone: '016239004', address: 'ភូមិ ព្រែកត្រែង ឃុំ សំរោងធំ ស្រុក កៀនស្វាយ ខេត្ត កណ្តាល', status: 'active', startDate: '2022-01-15' },
        { id: 'SN-CO-000002', name: 'សុខ ស្រីនិច', gender: 'ស្រី', dob: '1998-05-10', phone: '011464343', address: 'ភូមិ ព្រែកត្រែង ឃុំ សំរោងធំ ស្រុក កៀនស្វាយ ខេត្ត កណ្តាល', status: 'active', startDate: '2021-11-20' },
        { id: 'SN-CO-000001', name: 'រឿន រដ្ឋា', gender: 'ប្រុស', dob: '1995-12-01', phone: '098765432', address: 'ភូមិ ព្រែកត្រែង ឃុំ សំរោងធំ ស្រុក កៀនស្វាយ ខេត្ត កណ្តាល', status: 'inactive', startDate: '2020-03-01' },
    ]);

    // Document Type State
    const [isDocTypeModalOpen, setDocTypeModalOpen] = useState(false);
    const [editingDocType, setEditingDocType] = useState(null);
    const [docTypeData, setDocTypeData] = useState([
        { id: 1, name: 'ប្លង់រឹង', purpose: 'LMAP' },
        { id: 2, name: 'ប័ណ្ណសម្គាល់យានយន្ត', purpose: '' },
        { id: 3, name: 'សៀវភៅគ្រួសារ', purpose: '' },
    ]);

    // Collateral State
    const [editingCollateral, setEditingCollateral] = useState(null);
    const [collateralData, setCollateralData] = useState([
        { id: 101, name: 'ប្លង់ដី 123', docTypeId: 1, purpose: 'ដាក់ធានាកម្ចី', estimatedValue: 50000 },
        { id: 102, name: 'Lexus RX330', docTypeId: 2, purpose: '', estimatedValue: 15000 },
    ]);

    // Loan State
    const [loanData, setLoanData] = useState([
        { id: 1, customerId: 3, loanNumber: 'L-00104', officerId: 'SN-CO-000003', loanAmount: 998.08, interestRate: 8.00, duration: 40, periodType: 'month', adminFeeTotal: 0, totalPayable: 1114.90, totalPaid: 1114.90, loanDate: '2024-07-08', firstPaymentDate: '2024-08-10', payoffDate: '2024-08-10', paymentTerm: 'បង់ប្រាក់ដើមនិងការប្រាក់ថេរ', status: 'paid' },
        { id: 2, customerId: 2, loanNumber: 'L-00105', officerId: 'SN-CO-000002', loanAmount: 5000, interestRate: 9.50, duration: 60, periodType: 'day', adminFeeTotal: 50, totalPayable: 5500, totalPaid: 5500, loanDate: '2024-06-10', firstPaymentDate: '2024-07-10', payoffDate: '2024-08-10', paymentTerm: 'បង់រំលោះថេរ', status: 'active' },
    ]);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type, show: true });
        setTimeout(() => setNotification({ message: '', type: '', show: false }), 3000);
    };

    // --- CRUD Handlers ---
    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer);
        setActivePage(customer ? 'customers-edit' : 'customers-create');
    };
    const handleSaveCustomer = (updatedCustomer) => {
        if (updatedCustomer.id && editingCustomer) {
            setCustomerData(customerData.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
            showNotification('ព័ត៌មានអតិថិជនត្រូវបានកែសម្រួលជោគជ័យ', 'success');
        } else {
            const newCustomer = { id: Date.now(), ...updatedCustomer };
            setCustomerData([...customerData, newCustomer]);
            showNotification('អតិថិជនថ្មីត្រូវបានបង្កើតដោយជោគជ័យ', 'success');
        }
        setEditingCustomer(null);
        setActivePage('customers');
    };

    const handleEditOfficer = (officer) => {
        setEditingOfficer(officer);
        setActivePage(officer ? 'credit-officers-edit' : 'credit-officers-create');
    };

    // Logic updated to prevent adding duplicate officer IDs
    const handleSaveOfficer = (updatedOfficer) => {
        const isEditing = !!editingOfficer;

        // If creating a new officer, check if the ID is already taken
        if (!isEditing && creditOfficerData.some(o => o.id === updatedOfficer.id)) {
            showNotification('Officer ID already exists. Please use a different one.', 'error');
            return; // Stop execution
        }

        if (isEditing) {
            setCreditOfficerData(creditOfficerData.map(o => (o.id === updatedOfficer.id ? updatedOfficer : o)));
            showNotification('Credit officer information has been successfully updated.', 'success');
        } else {
            // It's a new officer, add to the array
            setCreditOfficerData([...creditOfficerData, updatedOfficer]);
            showNotification('New credit officer has been successfully created.', 'success');
        }
        setEditingOfficer(null);
        setActivePage('credit-officers');
    };

    // Document Type Handlers
    const handleOpenDocTypeModal = (docType) => {
        setEditingDocType(docType);
        setDocTypeModalOpen(true);
    };
    const handleSaveDocType = (savedDocType) => {
        const isExisting = docTypeData.some(c => c.id === savedDocType.id);
        if (isExisting) {
            setDocTypeData(docTypeData.map(c => c.id === savedDocType.id ? savedDocType : c));
            showNotification('ប្រភេទឯកសារត្រូវបានកែសម្រួលជោគជ័យ', 'success');
        } else {
            setDocTypeData([...docTypeData, savedDocType]);
            showNotification('ប្រភេទឯកសារថ្មីត្រូវបានបង្កើតដោយជោគជ័យ', 'success');
        }
    };

    // Collateral Handlers
    const handleEditCollateral = (collateral) => {
        setEditingCollateral(collateral);
        setActivePage(collateral ? 'collaterals-edit' : 'collaterals-create');
    };
    const handleSaveCollateral = (savedCollateral) => {
        const isExisting = collateralData.some(c => c.id === savedCollateral.id);
        if (isExisting && editingCollateral) {
            setCollateralData(collateralData.map(c => c.id === savedCollateral.id ? savedCollateral : c));
            showNotification('ទ្រព្យធានាត្រូវបានកែសម្រួលជោគជ័យ', 'success');
        } else {
            setCollateralData([...collateralData, { ...savedCollateral, id: Date.now() }]);
            showNotification('ទ្រព្យធានាថ្មីត្រូវបានបង្កើតដោយជោគជ័យ', 'success');
        }
        setEditingCollateral(null);
        setActivePage('collaterals');
    };

    // Loan Save Handler (Placeholder as logic is complex on CreateLoanPage)
    const handleSaveLoan = (loanDetails, schedule) => {
        // In a real app, you'd save this to a backend.
        // For now, we'll just add it to the state.
        const newLoan = {
            id: Date.now(),
            loanNumber: `L-${Date.now().toString().slice(-5)}`, // Simple unique ID
            ...loanDetails,
            totalPaid: 0, // Assuming new loans start with 0 paid
            status: 'active' // New loans are active
            // You might want to calculate totalPayable and other summary fields here
        };
        setLoanData(prevLoans => [...prevLoans, newLoan]);
        showNotification('កម្ចីត្រូវបានរក្សាទុកជោគជ័យ!', 'success');
        setActivePage('loan-list'); // Navigate to loan list after saving
    };


    return (
        <>
            {/* Global styles moved to index.css */}
            <div className="flex h-screen bg-gray-100 overflow-hidden" style={{ fontFamily: "'Battambang', sans-serif" }}>
                <Notification message={notification.message} type={notification.type} show={notification.show} />
                <Sidebar
                    isMobileOpen={isMobileOpen}
                    setMobileOpen={setMobileOpen}
                    isDesktopCollapsed={isDesktopCollapsed}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    navItems={navItems}
                />
                <DocumentTypeFormModal
                    isOpen={isDocTypeModalOpen}
                    onClose={() => setDocTypeModalOpen(false)}
                    onSave={handleSaveDocType}
                    docType={editingDocType}
                    showNotification={showNotification}
                />
                <div className="flex-1 flex flex-col min-w-0">
                    <Header
                        onMobileMenuClick={() => setMobileOpen(true)}
                        onCollapseToggleClick={() => setDesktopCollapsed(!isDesktopCollapsed)}
                        pageTitle={pageTitles[activePage] || 'ប្រព័ន្ធគ្រប់គ្រង'}
                    />
                    {renderActivePage()}
                </div>
            </div>
        </>
    );
}