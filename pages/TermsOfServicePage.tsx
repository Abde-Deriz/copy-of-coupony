
import React, { FC } from 'react';
import { PageHeader } from '../components/PageHeader';

export const TermsOfServicePage: FC = () => (
    <>
        <PageHeader title="Terms of Service" subtitle="Please read these terms carefully." />
        <div className="container mx-auto px-6 py-16">
             <div className="prose lg:prose-xl max-w-4xl mx-auto text-gray-700">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
                <h2>2. Disclaimer</h2>
                <p>All the information on this website is published in good faith and for general information purpose only. We do not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website, is strictly at your own risk.</p>
                <h2>3. Affiliate Disclosure</h2>
                <p>This site contains affiliate links to products. We may receive a commission for purchases made through these links. This helps support our work and allows us to continue to bring you the best deals.</p>
                <p><em>This is a placeholder. Please consult with a legal professional to create a comprehensive terms of service document for your website.</em></p>
            </div>
        </div>
    </>
);
