import React, { useState, FC } from 'react';
import { CheckIcon, ClipboardIcon } from './Icons';

export const AffiliateCodeInlineBox: FC<{ code: string; link: string; instructions: string }> = ({ code, link, instructions }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        });
    };

    return (
        <div className="bg-temu-yellow/20 border-2 border-temu-purple p-6 rounded-xl my-8 neu-base neu-shadow">
            <h3 className="text-2xl font-heading font-bold text-brand-black mb-3 text-center">Join the Affiliate Program</h3>
            <p className="text-gray-700 text-center mb-4">{instructions}</p>
            <div className="bg-white rounded-lg p-3 text-center mb-4 neu-base">
                <span className="text-3xl font-heading font-extrabold text-temu-purple tracking-widest">{code}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleCopy}
                    className={`w-full flex items-center justify-center text-lg font-bold py-3 px-6 rounded-lg neu-base neu-shadow-sm neu-shadow-sm-hover focus:outline-none ${
                        isCopied
                        ? 'bg-green-400 text-brand-black'
                        : 'bg-temu-orange text-white'
                    }`}
                >
                    {isCopied ? <CheckIcon className="h-6 w-6 mr-2" /> : <ClipboardIcon className="h-6 w-6 mr-2" />}
                    {isCopied ? 'Copied!' : 'Copy My Invite Code'}
                </button>
                 <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center text-lg font-bold py-3 px-6 rounded-lg neu-base neu-shadow-sm neu-shadow-sm-hover focus:outline-none bg-temu-purple text-white"
                >
                    Shop Now
                </a>
            </div>
        </div>
    );
};