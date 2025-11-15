
import React, { FC } from 'react';
import { PageHeader } from '../components/PageHeader';

export const CategoriesPage: FC = () => (
    <>
        <PageHeader title="Categories" subtitle="Find deals sorted by category." />
        <div className="container mx-auto px-6 py-16 text-center">
            <p className="text-lg text-gray-700">Category listings are coming soon. Stay tuned!</p>
        </div>
    </>
);
