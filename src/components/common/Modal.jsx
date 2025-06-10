import React from 'react';

const Modal = ({ children, isOpen, onClose, title, maxWidth = 'max-w-lg' }) => {
    if (!isOpen) return null;
    const handleContentClick = (e) => e.stopPropagation();

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
            <div onClick={handleContentClick} className={`bg-white rounded-lg shadow-xl w-full ${maxWidth} max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-scale-in`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;