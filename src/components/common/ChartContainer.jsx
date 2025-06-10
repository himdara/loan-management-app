import React from 'react';
import { ResponsiveContainer } from 'recharts'; // Only import what's needed here

const ChartContainer = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>{children}</ResponsiveContainer>
        </div>
    </div>
);

export default ChartContainer;