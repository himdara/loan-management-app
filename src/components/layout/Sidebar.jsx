import React, { useState } from 'react';

const Sidebar = ({ isMobileOpen, setMobileOpen, isDesktopCollapsed, navItems, activePage, setActivePage }) => {
    const [openSubmenu, setOpenSubmenu] = useState('ទំនាក់ទំនង');
    const handleMenuClick = (page) => { if (page) { setActivePage(page); if(isMobileOpen) { setMobileOpen(false); } } };
    const handleSubmenuClick = (itemName) => { if (isDesktopCollapsed) return; setOpenSubmenu(openSubmenu === itemName ? null : itemName); };

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)}></div>
            <aside className={`fixed top-0 left-0 h-full bg-white transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out z-40 flex flex-col ${isDesktopCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
                <div className="flex items-center border-b px-4 h-16 shrink-0 overflow-hidden">
                    <img src="https://placehold.co/40x40/06b6d4/FFFFFF?text=L" alt="Logo" className="rounded-lg shrink-0"/>
                    <h1 className={`text-lg font-bold text-gray-800 leading-tight ml-3 whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                        ប្រព័ន្ធគ្រប់គ្រងហាងកម្ចី
                    </h1>
                    <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-500 ml-auto"><i className="fa-solid fa-times"></i></button>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul className="py-4">
                        {navItems.map((item) => {
                            const isParentOfActive = item.submenu?.some(sub => sub.page === activePage || activePage.startsWith(sub.page + '-'));
                            const isActive = activePage === item.page || isParentOfActive;

                            return (
                            <li key={item.name} className="px-4 py-1">
                                <div onClick={() => item.hasSubmenu ? handleSubmenuClick(item.name) : handleMenuClick(item.page)} className={`flex items-center p-3 rounded-lg text-base transition-colors overflow-hidden cursor-pointer ${isDesktopCollapsed ? 'justify-center' : ''} ${(isActive || (openSubmenu === item.name && !isDesktopCollapsed)) ? 'text-cyan-600 font-bold' : 'text-gray-600 hover:bg-gray-100'} ${isActive && !item.hasSubmenu ? 'bg-cyan-50' : ''} ${isParentOfActive ? 'bg-cyan-50' : ''}`}>
                                    <div className="shrink-0 w-5 text-center">{item.icon}</div>
                                    <div className={`flex justify-between items-center flex-1 ml-3 transition-opacity duration-200 ${isDesktopCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                                        <span className="whitespace-nowrap">{item.name}</span>
                                        {item.hasSubmenu && (<i className={`fa-solid fa-chevron-right text-xs transition-transform ${openSubmenu === item.name ? 'rotate-90' : ''}`}></i>)}
                                    </div>
                                </div>
                                {item.hasSubmenu && item.submenu && openSubmenu === item.name && !isDesktopCollapsed && (
                                    <ul className="pl-8 pt-1 transition-all duration-300">
                                        {item.submenu.map((subItem) => {
                                            const isSubItemActive = activePage === subItem.page || activePage.startsWith(subItem.page + '-');
                                            return (
                                            <li key={subItem.page || subItem.name} className="py-1">
                                                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick(subItem.page); }} className={`text-base ${isSubItemActive ? 'text-cyan-600 font-bold' : 'text-gray-500 hover:text-cyan-600'}`}>
                                                    {subItem.name}
                                                </a>
                                            </li>
                                            )})}
                                    </ul>
                                )}
                            </li>
                            )})}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;