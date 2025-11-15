
import React, { FC, useState } from 'react';
import { MenuIcon, XIcon } from './Icons';
import { Navigator } from '../types';

export const Header: FC<{ currentPath: string; navigate: Navigator; }> = ({ currentPath, navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/categories', label: 'Categories' },
        { path: '/blogs', label: 'Blog' },
        { path: '/about', label: 'About' },
    ];

    const NavLink: FC<{ path: string; label: string }> = ({ path, label }) => {
        const isActive = path === '/' ? currentPath === '/' : currentPath.startsWith(path);
        return (
            <a
                href={path}
                onClick={(e) => {
                    navigate(path, e);
                    setIsMenuOpen(false);
                }}
                className={`text-lg font-bold px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                        ? 'bg-temu-purple/10 text-temu-purple'
                        : 'text-gray-700 hover:bg-gray-200'
                }`}
            >
                <span>{label}</span>
            </a>
        );
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b-4 border-brand-black">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <a href="/" onClick={(e) => navigate('/', e)} className="font-heading text-3xl font-extrabold cursor-pointer">
                        <span className="text-temu-purple">Cou</span>
                        <span className="text-temu-orange">pony</span>
                    </a>
                    
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map(item => <NavLink key={item.path} {...item} />)}
                    </nav>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-temu-purple"
                        >
                            {isMenuOpen ? <XIcon className="h-8 w-8 text-brand-black" /> : <MenuIcon className="h-8 w-8 text-brand-black" />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t-2 border-gray-200">
                        <nav className="flex flex-col space-y-2">
                             {navItems.map(item => <NavLink key={item.path} {...item} />)}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
