import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatCardPrimary from '../../components/common/StatCardPrimary'; // Import StatCardPrimary
import ChartContainer from '../../components/common/ChartContainer'; // Import ChartContainer
import FontAwesomeDollarIcon from '../../components/common/FontAwesomeDollarIcon'; // Import FontAwesomeDollarIcon
import { COLORS } from '../../utils/constants'; // Import COLORS from constants

const DashboardPage = () => {
    // Sample data for charts
    const loanData = [
        { name: 'Jan', 'Active Loans': 4000, 'Paid Off': 2400 },
        { name: 'Feb', 'Active Loans': 3000, 'Paid Off': 1398 },
        { name: 'Mar', 'Active Loans': 2000, 'Paid Off': 9800 },
        { name: 'Apr', 'Active Loans': 2780, 'Paid Off': 3908 },
        { name: 'May', 'Active Loans': 1890, 'Paid Off': 4800 },
        { name: 'Jun', 'Active Loans': 2390, 'Paid Off': 3800 },
    ];

    const loanTypeData = [
        { name: 'Personal Loan', value: 400 },
        { name: 'Business Loan', value: 300 },
        { name: 'Mortgage', value: 300 },
        { name: 'Auto Loan', value: 200 },
    ];

    // COLORS is imported from constants.js now

    const dailyTrendData = [
        { name: 'Mon', 'Amount': 2200 },
        { name: 'Tue', 'Amount': 1900 },
        { name: 'Wed', 'Amount': 3400 },
        { name: 'Thu', 'Amount': 4100 },
        { name: 'Fri', 'Amount': 2500 },
        { name: 'Sat', 'Amount': 3800 },
        { name: 'Sun', 'Amount': 1600 },
    ];

    return (
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCardPrimary title="Total Active Loans" value="$1,234,567" icon={<FontAwesomeDollarIcon />} />
                <StatCardPrimary title="Total Customers" value="890" icon={<div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"><i className="fa-solid fa-users text-orange-600 text-xl"></i></div>} />
                <StatCardPrimary title="Loans Due Today" value="15" icon={<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><i className="fa-solid fa-triangle-exclamation text-red-600 text-xl"></i></div>} />
                <StatCardPrimary title="Payments Received Today" value="$25,830" icon={<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><i className="fa-solid fa-sack-dollar text-green-600 text-xl"></i></div>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                <div className="lg:col-span-3">
                    <ChartContainer title="Loan Overview">
                        <BarChart data={loanData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Paid Off" fill="#82ca9d" />
                            <Bar dataKey="Active Loans" fill="#8884d8" />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div className="lg:col-span-2">
                    <ChartContainer title="Loan Types Distribution">
                        <PieChart>
                            <Pie data={loanTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                                {loanTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer title="Daily Payment Trends">
                    <LineChart data={dailyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Amount" stroke="#FF5733" strokeWidth={2} />
                    </LineChart>
                </ChartContainer>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-3 flex items-center justify-between"><p className="text-sm">New loan application from <strong>Keo Mala</strong></p><span className="text-xs text-gray-500">10 mins ago</span></li>
                        <li className="py-3 flex items-center justify-between"><p className="text-sm">Payment received from <strong>Chhon Sovanratana</strong></p><span className="text-xs text-gray-500">1 hour ago</span></li>
                        <li className="py-3 flex items-center justify-between"><p className="text-sm">Loan approved for <strong>Sok Chantha</strong></p><span className="text-xs text-gray-500">3 hours ago</span></li>
                        <li className="py-3 flex items-center justify-between"><p className="text-sm">New user <strong>Admin 02</strong> added</p><span className="text-xs text-gray-500">Yesterday</span></li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;