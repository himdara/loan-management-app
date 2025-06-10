import React from 'react';

const Notification = ({ message, type, show }) => {
    if (!show) return null;
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-20 right-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 animate-slide-in z-[100]`}>
            {message}
        </div>
    );
};

export default Notification;