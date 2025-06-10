import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar'; // Import FilterSidebar
import StatusBadge from '../../components/common/StatusBadge'; // Import StatusBadge
import { formatDate as formatUtilDate } from '../../utils/helpers'; // Import formatDate from utils

const LoanListPage = ({ loans, customers, officers, setActivePage, showNotification }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const getCustomerName = (customerId) => customers.find(c => c.id === customerId)?.customer.name || 'N/A';
    const getOfficerName = (officerId) => officers.find(o => o.id === officerId)?.name || 'N/A';

    // formatDate is now imported from utils/helpers.js

    const tableHeaders = ["ល.រ", "ឈ្មោះអតិថិជន", "លេខកូដកម្ចី", "ឈ្មោះមន្រ្តីឥណទាន", "កាលបរិច្ឆេទដាក់កម្ចី", "ថ្ងៃ​ចាប់ផ្តើម", "ទឹកប្រាក់កម្ចី", "ការប្រាក់ %", "ការប្រាក់សរុប", "ចំនួនទឹកប្រាក់កម្ចីសរុប", "សេវារដ្ឋបាលសរុប", "ទឹកប្រាក់បានទទួលសរុប", "ប្រាក់ដើមនៅជំពាក់សរុប", "ទឹកប្រាក់នៅជំពាក់សរុប", "រយៈពេល", "ប្រភេទបង់ប្រាក់", "ស្ថានភាព", "សកម្មភាព"];

    const totals = loans.reduce((acc, loan) => {
        const totalInterest = loan.totalPayable - loan.loanAmount; // Recalculate total interest for consistency
        const netReceived = loan.loanAmount - loan.adminFeeTotal;
        const remainingBalance = (loan.totalPayable - loan.totalPaid);

        acc.totalLoanAmount += loan.loanAmount;
        acc.totalInterest += totalInterest;
        acc.totalPayable += loan.totalPayable;
        acc.adminFeeTotal += loan.adminFeeTotal;
        acc.netReceived += netReceived;
        // Simplified principal balance calculation: remaining loan amount if still active, otherwise 0
        acc.principalBalance += (loan.status === 'active' ? (loan.loanAmount - (loan.totalPaid - totalInterest)) : 0);
        acc.totalBalance += remainingBalance;
        return acc;
    }, { totalLoanAmount: 0, totalInterest: 0, totalPayable: 0, adminFeeTotal: 0, netReceived: 0, principalBalance: 0, totalBalance: 0 });


    return (
        <main className="flex-1 p-6 bg-gray-50 flex flex-col">
            <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} officers={officers} />
            <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b gap-3">
                    <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">បញ្ជីកម្ចី</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <button onClick={() => { /* Placeholder for officer change */ }} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 flex items-center gap-2 w-full sm:w-auto justify-center whitespace-nowrap"><i className="fa-solid fa-repeat"></i></button>
                        <button onClick={() => setIsFilterOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2 w-full sm:w-auto justify-center whitespace-nowrap"><i className="fa-solid fa-filter"></i></button>
                    </div>
                </div>
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                {tableHeaders.map((header) => (<th key={header} scope="col" className="sticky top-0 px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50 z-10 whitespace-nowrap border border-gray-300">{header}</th>))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {loans.map((loan, index) => {
                                const totalInterest = loan.totalPayable - loan.loanAmount;
                                const netReceived = loan.loanAmount - loan.adminFeeTotal;
                                const totalBalance = loan.totalPayable - loan.totalPaid;
                                // Calculate principal balance accurately: loan amount minus principal paid
                                const principalPaid = loan.totalPaid - totalInterest;
                                const principalBalance = loan.loanAmount - principalPaid;

                                return (
                                    <tr key={loan.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">{getCustomerName(loan.customerId)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">{loan.loanNumber}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">{getOfficerName(loan.officerId)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">{formatUtilDate(loan.loanDate)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">{formatUtilDate(loan.firstPaymentDate)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">${parseFloat(loan.loanAmount).toFixed(2)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">{loan.interestRate}%</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">${totalInterest.toFixed(2)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">${loan.totalPayable.toFixed(2)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">${parseFloat(loan.adminFeeTotal).toFixed(2)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">${netReceived.toFixed(2)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">${principalBalance > 0 ? principalBalance.toFixed(2) : '0.00'}</td>
                                        <td className="px-3 py-1 border border-gray-300 text-red-600 font-bold whitespace-nowrap">${totalBalance.toFixed(2)}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap">{loan.duration} {loan.periodType === 'month' ? 'ខែ' : 'ថ្ងៃ'}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap" style={{minWidth: '200px'}}>{loan.paymentTerm}</td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap"><StatusBadge status={loan.status} /></td>
                                        <td className="px-3 py-1 border border-gray-300 whitespace-nowrap" style={{minWidth: '200px'}}>
                                            <div className="flex items-center gap-2">
                                                <button className="text-red-600 hover:text-red-800 p-1" title="បន្ថែម"><i className="fa-solid fa-plus fa-fw"></i></button>
                                                <button style={{color: 'rgb(6, 182, 212)'}} className="hover:opacity-70 p-1" title="បោះពុម្ព"><i className="fa-solid fa-print fa-fw"></i></button>
                                                <button className="text-green-600 hover:text-green-800 p-1" title="មើលលម្អិត"><i className="fa-solid fa-eye fa-fw"></i></button>
                                                <button className="text-gray-600 hover:text-gray-800 p-1" title="បើក Folder"><i className="fa-solid fa-folder-open fa-fw"></i></button>
                                                <button style={{color: 'rgb(6, 182, 212)'}} className="hover:opacity-70 p-1" title="តារាង"><i className="fa-solid fa-table fa-fw"></i></button>
                                                <button style={{color: 'rgb(6, 182, 212)'}} className="hover:opacity-70 p-1" title="ផ្លាស់ប្តូរ"><i className="fa-solid fa-repeat fa-fw"></i></button>
                                                <button className="text-red-600 hover:text-red-800 p-1" title="ចេញ"><i className="fa-solid fa-arrow-up-right-from-square fa-fw"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot className="bg-gray-100 font-bold">
                            <tr>
                                <td colSpan="6" className="px-4 py-2 border border-gray-300 text-right">សរុប</td>
                                <td className="px-4 py-2 border border-gray-300">${totals.totalLoanAmount.toFixed(2)}</td>
                                <td className="px-4 py-2 border border-gray-300"></td>
                                <td className="px-4 py-2 border border-gray-300">${totals.totalInterest.toFixed(2)}</td>
                                <td className="px-4 py-2 border border-gray-300">${totals.totalPayable.toFixed(2)}</td>
                                <td className="px-4 py-2 border border-gray-300">${totals.adminFeeTotal.toFixed(2)}</td>
                                <td className="px-4 py-2 border border-gray-300">${totals.netReceived.toFixed(2)}</td>
                                <td className="px-4 py-2 border border-gray-300">${totals.principalBalance.toFixed(2)}</td>
                                <td className="px-4 py-2 border border-gray-300 text-red-600">${totals.totalBalance.toFixed(2)}</td>
                                <td colSpan="4" className="px-4 py-2 border border-gray-300"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default LoanListPage;