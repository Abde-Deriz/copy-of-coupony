
import React, { FC } from 'react';
import { InstagramIcon, PinterestIcon, TikTokIcon } from './Icons';
import { Navigator } from '../types';

export const Footer: FC<{ navigate: Navigator }> = ({ navigate }) => (
    <footer className="bg-brand-black text-gray-400 py-12">
        <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6">
                <a href="/about" onClick={(e) => navigate('/about', e)} className="hover:text-white transition-colors">About Us</a>
                <a href="/privacy-policy" onClick={(e) => navigate('/privacy-policy', e)} className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" onClick={(e) => navigate('/terms-of-service', e)} className="hover:text-white transition-colors">Terms of Service</a>
                <a href="/blogs" onClick={(e) => navigate('/blogs', e)} className="hover:text-white transition-colors">Blog</a>
                <a href="mailto:contact.coupony@gmail.com" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex justify-center space-x-6 mb-6">
                <a href="#" aria-label="Instagram" className="hover:text-white"><InstagramIcon className="w-6 h-6"/></a>
                <a href="#" aria-label="Pinterest" className="hover:text-white"><PinterestIcon className="w-6 h-6"/></a>
                <a href="#" aria-label="TikTok" className="hover:text-white"><TikTokIcon className="w-6 h-6"/></a>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} Coupony. All rights reserved.</p>
            <p className="mt-2 text-xs">Disclaimer: We may earn a commission when you use our links. This helps us find the best deals for you.</p>
        </div>
    </footer>
);
