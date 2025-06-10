import React from 'react';

const Header = ({ onMobileMenuClick, onCollapseToggleClick, pageTitle }) => {
    return (
        <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-20 p-4 flex items-center justify-between border-b h-16">
            <div className="flex items-center gap-4">
                <button onClick={onMobileMenuClick} className="lg:hidden text-gray-600"><i className="fa-solid fa-bars"></i></button>
                <button onClick={onCollapseToggleClick} className="hidden lg:block text-gray-600 hover:text-cyan-600"><i className="fa-solid fa-bars"></i></button>
                <h2 className="text-xl font-bold text-gray-800">{pageTitle}</h2>
            </div>
            <div className="flex items-center gap-6">
                <button className="text-base text-gray-500 hover:text-cyan-600">Select month</button>
                <button className="text-gray-500 hover:text-cyan-500"><i className="fa-solid fa-bell text-xl"></i></button>
                <button className="text-gray-500 hover:text-cyan-500"><i className="fa-solid fa-gear text-xl"></i></button>
                <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center"><i className="fa-solid fa-user text-white"></i></div>
            </div>
        </header>
    );
};

export default Header;