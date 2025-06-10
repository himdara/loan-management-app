import React from 'react';

const StatusBadge = ({ status }) => {
    let bgColor, textColor, text;
    switch(status) {
        case 'active':
            bgColor = 'bg-green-100';
            textColor = 'text-green-700';
            text = 'សកម្ម';
            break;
        case 'inactive':
            bgColor = 'bg-red-100';
            textColor = 'text-red-700';
            text = 'អសកម្ម';
            break;
        case 'paid':
            bgColor = 'bg-blue-100';
            textColor = 'text-blue-800';
            text = 'បង់ផ្តាច់';
            break;
        default:
            bgColor = 'bg-gray-100';
            textColor = 'text-gray-800';
            text = 'មិនស្គាល់';
    }
    return (
        <span className={`px-3 py-1 text-xs font-bold leading-none rounded-full ${bgColor} ${textColor}`}>
            {text}
        </span>
    );
};

export default StatusBadge;