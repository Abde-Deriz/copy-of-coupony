
import React, { FC } from 'react';
import { PageHeader } from '../components/PageHeader';

export const AboutPage: FC = () => (
    <>
        <PageHeader title="About Coupony" subtitle="Your trusted source for the best deals online." />
        <div className="container mx-auto px-6 py-16">
            <div className="prose lg:prose-xl max-w-4xl mx-auto text-gray-700">
                <p>Welcome to Coupony, your number one destination for finding the best and most reliable coupon codes on the internet. Our mission is simple: to help you save money and shop smarter.</p>
                <p>We tirelessly search the web, partner with brands, and verify each code to ensure you get a working discount every time. Whether you're looking for a deal on the latest fashion, electronics, or everyday essentials, Coupony has you covered.</p>
                <p>Thank you for trusting us to be your guide in the world of online savings!</p>
            </div>
        </div>
    </>
);
