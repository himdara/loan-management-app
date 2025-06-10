import React from 'react';

const StatCardPrimary = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
        {icon}
        <div>
            <h3 className="text-gray-500 text-sm font-semibold">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default StatCardPrimary;