import React, { useState, useEffect } from 'react';
import { FormField, Input, Select } from '../../components/common/FormComponents'; // Import reusable form components
import { formatDate as formatUtilDate } from '../../utils/helpers'; // Import formatDate from utils

const CreateLoanPage = ({ customers, officers, collaterals, showNotification, handleSaveLoan }) => {
    const [collateralInputs, setCollateralInputs] = useState([{ id: 1, number: '', date: '', collateralId: '', depositInfo: '' }]);
    const [loanDetails, setLoanDetails] = useState({
        customerId: '',
        officerId: '',
        loanAmount: '',
        paymentTerm: '',
        periodType: 'month', // Default to month
        duration: '',
        loanDate: '',
        firstPaymentDate: '',
        interestRate: '',
        adminFeePercent: '',
        adminFeeTotal: '',
        disbursementMethod: '',
        purpose: ''
    });
    const [schedule, setSchedule] = useState([]);

    // Auto-calculate Admin Fee Total
    useEffect(() => {
        const amount = parseFloat(loanDetails.loanAmount);
        const feePercent = parseFloat(loanDetails.adminFeePercent);
        if (!isNaN(amount) && !isNaN(feePercent)) {
            setLoanDetails(prev => ({ ...prev, adminFeeTotal: (amount * feePercent / 100).toFixed(2) }));
        } else {
            setLoanDetails(prev => ({ ...prev, adminFeeTotal: '' }));
        }
    }, [loanDetails.loanAmount, loanDetails.adminFeePercent]);

    // Auto-calculate First Payment Date robustly, handling end-of-month cases
    useEffect(() => {
        if (loanDetails.loanDate) {
            const loanDateObj = new Date(loanDetails.loanDate + 'T00:00:00'); // Add T00:00:00 to avoid timezone issues
            const originalDay = loanDateObj.getDate();

            loanDateObj.setMonth(loanDateObj.getMonth() + 1);

            // If setting to next month resulted in a different month than expected (e.g., Jan 31 + 1 month -> Mar 2),
            // it means the target month is shorter. Set to the last day of the target month.
            if (loanDateObj.getDate() !== originalDay && loanDateObj.getMonth() !== (new Date(loanDetails.loanDate + 'T00:00:00').getMonth() + 1) % 12) {
                loanDateObj.setDate(0); // Set to the last day of the previous month (which is the desired next month's end)
            }

            setLoanDetails(prev => ({ ...prev, firstPaymentDate: loanDateObj.toISOString().split('T')[0] }));
        }
    }, [loanDetails.loanDate]);

    const handleCollateralChange = (index, event) => {
        const values = [...collateralInputs];
        values[index][event.target.name] = event.target.value;
        setCollateralInputs(values);
    };

    const handleAddCollateral = () => {
        setCollateralInputs([...collateralInputs, { id: Date.now(), number: '', date: '', collateralId: '', depositInfo: '' }]);
    };

    const handleRemoveCollateral = (idToRemove) => {
        if (collateralInputs.length > 1) {
            setCollateralInputs(collateralInputs.filter(input => input.id !== idToRemove));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerateSchedule = () => {
        const P = parseFloat(loanDetails.loanAmount);
        const annualInterestRate = parseFloat(loanDetails.interestRate) / 100;
        const n = parseInt(loanDetails.duration);

        if (isNaN(P) || P <= 0 || isNaN(annualInterestRate) || annualInterestRate < 0 || isNaN(n) || n <= 0 || !loanDetails.firstPaymentDate) {
            showNotification("សូមពិនិត្យទឹកប្រាក់កម្ចី, អត្រាការប្រាក់, រយៈពេល, និងកាលបរិច្ឆេទចាប់ផ្ដើមបង់ប្រាក់។", "error");
            return;
        }

        let periodsPerYear;
        switch(loanDetails.periodType) {
            case 'day': periodsPerYear = 365; break;
            case 'week': periodsPerYear = 52; break;
            case 'half_month': periodsPerYear = 24; break;
            case 'month': periodsPerYear = 12; break;
            default: periodsPerYear = 12; // Default to month
        }

        const r = annualInterestRate / periodsPerYear;
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        let newSchedule = [];
        let balance = P;
        let paymentDate = new Date(loanDetails.firstPaymentDate + 'T00:00:00'); // Ensure date is parsed consistently

        for (let i = 1; i <= n; i++) {
            let interestPayment = balance * r;
            let principalPayment = M - interestPayment;
            balance -= principalPayment;

            newSchedule.push({
                no: i,
                date: paymentDate.toISOString().split('T')[0],
                days: 30, // This is a placeholder, could be calculated dynamically if needed
                principal: principalPayment,
                interest: interestPayment,
                total: M,
                balance: balance > 0 ? balance : 0,
            });

            // Increment date for the next iteration, preserving day of month where possible
            let currentDay = paymentDate.getDate();
            switch(loanDetails.periodType) {
                case 'day': paymentDate.setDate(paymentDate.getDate() + 1); break;
                case 'week': paymentDate.setDate(paymentDate.getDate() + 7); break;
                case 'half_month': paymentDate.setDate(paymentDate.getDate() + 15); break; // Simplified, ideally based on exact half-month
                case 'month':
                    paymentDate.setMonth(paymentDate.getMonth() + 1);
                    // Handle end-of-month rollovers (e.g., Jan 31 -> Feb 28, then Feb 28 + 1 month should be Mar 28, not Mar 31)
                    if (paymentDate.getDate() !== currentDay) {
                        paymentDate.setDate(0); // Sets to last day of previous month (desired new month's last day)
                    }
                    break;
                default: paymentDate.setMonth(paymentDate.getMonth() + 1);
            }
        }

        setSchedule(newSchedule);
        showNotification('កាលវិភាគបង់ប្រាក់ត្រូវបានបង្កើត!', 'success');
    };

    const handleClearSchedule = () => {
        setSchedule([]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!loanDetails.customerId || !loanDetails.officerId || !loanDetails.loanAmount || !loanDetails.paymentTerm || !loanDetails.periodType || !loanDetails.duration || !loanDetails.loanDate || !loanDetails.firstPaymentDate) {
            showNotification('សូមបំពេញគ្រប់ប្រអប់ដែលមានសញ្ញា * នៅក្នុងព័ត៌មានកម្ចី', 'error');
            return;
        }
        if (schedule.length === 0) {
            showNotification('សូមបង្កើតកាលវិភាគបង់ប្រាក់ជាមុនសិន', 'error');
            return;
        }

        handleSaveLoan({ ...loanDetails, schedule, totalPayable: schedule.reduce((sum, item) => sum + item.total, 0) });
    };

    return (
        <main className="flex-1 p-6 bg-gray-50 flex flex-col">
            <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-sm flex-1 flex flex-col p-6 gap-6">
                {/* Top Section Inputs */}
                {collateralInputs.map((collateral, index) => (
                    <div key={collateral.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                        <FormField label="លេខទ្រព្យធានា" className="lg:col-span-2">
                            <Input name="number" placeholder="លេខទ្រព្យធានា" value={collateral.number} onChange={e => handleCollateralChange(index, e)} />
                        </FormField>
                        <FormField label="ថ្ងៃ" className="lg:col-span-2">
                            <Input type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} name="date" placeholder="ថ្ងៃ/ខែ/ឆ្នាំ" value={collateral.date} onChange={e => handleCollateralChange(index, e)} />
                        </FormField>
                        <FormField label="ទ្រព្យធានា" className="lg:col-span-3">
                                <Select name="collateralId" value={collateral.collateralId} onChange={e => handleCollateralChange(index, e)}>
                                    <option value="" disabled>-- ជ្រើសរើសទ្រព្យធានា --</option>
                                    {collaterals.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </Select>
                        </FormField>
                        <FormField label="ដាក់ទ្រព្យធានា" className="lg:col-span-4">
                            <div className="flex items-center gap-2">
                                <Input name="depositInfo" placeholder="ដាក់ទ្រព្យធានា" value={collateral.depositInfo} onChange={e => handleCollateralChange(index, e)} disabled />
                                {index === collateralInputs.length - 1 ? (
                                    <button type="button" onClick={handleAddCollateral} className="h-10 w-10 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center justify-center shrink-0"><i className="fa-solid fa-plus"></i></button>
                                ) : (
                                    <button type="button" onClick={() => handleRemoveCollateral(collateral.id)} className="h-10 w-10 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center shrink-0"><i className="fa-solid fa-minus"></i></button>
                                )}
                            </div>
                        </FormField>
                    </div>
                ))}

                <hr/>

                {/* Main Loan Details Form */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                        <FormField label="ឈ្មោះអតិថិជន" required>
                            <Select name="customerId" value={loanDetails.customerId} onChange={handleChange}>
                                    <option value="" disabled>-- ជ្រើសរើសអតិថិជន --</option>
                                    {customers.map(c => <option key={c.id} value={c.id}>{c.customer.name}</option>)}
                            </Select>
                        </FormField>
                        <FormField label="ឈ្មោះមន្ត្រីឥណទាន" required>
                            <Select name="officerId" value={loanDetails.officerId} onChange={handleChange}>
                                    <option value="" disabled>-- ជ្រើសរើសមន្ត្រី --</option>
                                    {officers.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                            </Select>
                        </FormField>
                        <FormField label="ទឹកប្រាក់កម្ចី" required>
                            <Input type="number" name="loanAmount" placeholder="បញ្ចូលទឹកប្រាក់កម្ចី" value={loanDetails.loanAmount} onChange={handleChange} />
                        </FormField>
                        <FormField label="លក្ខខណ្ឌបង់ប្រាក់" required>
                            <Select name="paymentTerm" value={loanDetails.paymentTerm} onChange={handleChange}>
                                <option value="" disabled>--លក្ខខណ្ឌបង់ប្រាក់--</option>
                                <option value="fixed_payment">បង់ប្រាក់ថេរ</option>
                                <option value="fixed_principal">បង់ប្រាក់ដើមថេរ</option>
                                <option value="principal_and_interest">បង់ប្រាក់ដើមនិងការប្រាក់</option>
                            </Select>
                        </FormField>
                        <FormField label="ប្រភេទរយៈពេល" required>
                            <Select name="periodType" value={loanDetails.periodType} onChange={handleChange}>
                                <option value="day">ថ្ងៃ</option>
                                <option value="week">សប្ដាហ៍</option>
                                <option value="half_month">កន្លះខែ</option>
                                <option value="month">ខែ</option>
                            </Select>
                        </FormField>
                        <FormField label="រយៈពេល" required>
                            <Input type="number" name="duration" placeholder="លើក" value={loanDetails.duration} onChange={handleChange} />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                        <FormField label="កាលបរិច្ឆេទដាក់កម្ចី" required>
                            <Input type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} name="loanDate" placeholder="ថ្ងៃ/ខែ/ឆ្នាំ" value={loanDetails.loanDate} onChange={handleChange} />
                        </FormField>
                        <FormField label="កាលបរិច្ឆេទចាប់ផ្ដើមបង់ប្រាក់" required>
                            <Input type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} name="firstPaymentDate" placeholder="ថ្ងៃ/ខែ/ឆ្នាំ" value={loanDetails.firstPaymentDate} onChange={handleChange} />
                        </FormField>
                        <FormField label="ការប្រាក់ %">
                            <Input type="number" step="0.01" name="interestRate" value={loanDetails.interestRate} onChange={handleChange} />
                        </FormField>
                        <FormField label="សេវារដ្ឋបាល %">
                            <Input type="number" step="0.01" name="adminFeePercent" value={loanDetails.adminFeePercent} onChange={handleChange} />
                        </FormField>
                        <FormField label="សេវារដ្ឋបាលសរុប">
                            <Input type="number" name="adminFeeTotal" value={loanDetails.adminFeeTotal} onChange={handleChange} disabled />
                        </FormField>
                        <FormField label="បញ្ចេញប្រាក់តាមរយៈ" required>
                                <Select name="disbursementMethod" value={loanDetails.disbursementMethod} onChange={handleChange}>
                                    <option value="" disabled>-- ជ្រើសរើស --</option>
                                    <option value="cash">សាច់ប្រាក់</option>
                                    <option value="bank">ធនាគារ</option>
                            </Select>
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                        <FormField label="គោលបំណង" className="lg:col-span-9">
                            <textarea name="purpose" value={loanDetails.purpose} onChange={handleChange} rows="1" className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none w-full"></textarea>
                        </FormField>
                        <div className="lg:col-span-3 flex justify-end gap-2">
                            {schedule.length > 0 ? (
                                <button type="button" onClick={handleClearSchedule} className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 h-10">Clear Row</button>
                            ) : (
                                <button type="button" onClick={handleGenerateSchedule} className="bg-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-700 h-10">Generate</button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-auto border-t pt-4 mt-4 flex-1">
                    <table className="w-full text-base text-left border border-collapse border-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                {["ល.រ", "កាលបរិច្ឆេទបង់ប្រាក់", "ចំនួនថ្ងៃ", "ប្រាក់ដើម", "ការប្រាក់", "ទឹកប្រាក់ត្រូវបង់", "ទឹកប្រាក់នៅសល់សរុប"].map(header => (
                                    <th key={header} className="px-4 py-2 border border-gray-300">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {schedule.length > 0 ? (
                                schedule.map(row => (
                                    <tr key={row.no}>
                                        <td className="px-4 py-2 border border-gray-300">{row.no}</td>
                                        <td className="px-4 py-2 border border-gray-300">{formatUtilDate(row.date)}</td> {/* Use imported formatDate */}
                                        <td className="px-4 py-2 border border-gray-300">{row.days}</td>
                                        <td className="px-4 py-2 border border-gray-300">${row.principal.toFixed(2)}</td>
                                        <td className="px-4 py-2 border border-gray-300">${row.interest.toFixed(2)}</td>
                                        <td className="px-4 py-2 border border-gray-300">${row.total.toFixed(2)}</td>
                                        <td className="px-4 py-2 border border-gray-300">${row.balance.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-10 text-gray-500 border border-gray-300">មិនទាន់មានកាលវិភាគបង់ប្រាក់...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {schedule.length > 0 && (
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg text-base font-semibold hover:bg-green-700 flex items-center gap-2">
                                <i className="fa-solid fa-floppy-disk mr-2"></i>រក្សាទុក
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </main>
    );
};

export default CreateLoanPage;