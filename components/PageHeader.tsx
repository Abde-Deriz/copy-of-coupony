
import React, { FC } from 'react';

export const PageHeader: FC<{title: string, subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-white py-16 text-center border-b-4 border-brand-black">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-black mb-2">{title}</h1>
            <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
    </div>
);
