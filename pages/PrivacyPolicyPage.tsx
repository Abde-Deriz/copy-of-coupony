
import React, { FC } from 'react';
import { PageHeader } from '../components/PageHeader';

export const PrivacyPolicyPage: FC = () => (
    <>
        <PageHeader title="Privacy Policy" subtitle="Your privacy is important to us." />
        <div className="container mx-auto px-6 py-16">
             <div className="prose lg:prose-xl max-w-4xl mx-auto text-gray-700">
                <h2>1. Information We Collect</h2>
                <p>We may collect personal information that you voluntarily provide to us when you use our services, such as your email address when you subscribe to our newsletter.</p>
                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to operate, maintain, and provide you with the features and functionality of the service, as well as to communicate directly with you, such as to send you email messages.</p>
                <h2>3. Sharing of Your Information</h2>
                <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
                <p><em>This is a placeholder policy. Please consult with a legal professional to create a comprehensive privacy policy for your website.</em></p>
            </div>
        </div>
    </>
);
