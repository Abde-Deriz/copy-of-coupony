
import React, { FC } from 'react';
import { PageHeader } from '../components/PageHeader';
import { AnimatedSection } from '../components/AnimatedSection';
import { blogPosts } from '../data/blogPosts';
import { Navigator } from '../types';

export const BlogListPage: FC<{ navigate: Navigator }> = ({ navigate }) => (
    <>
        <PageHeader title="The Coupony Blog" subtitle="Tips, tricks, and reviews to help you shop smarter." />
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <AnimatedSection key={post.slug}>
                            <a href={`/blogs/${post.slug}`} onClick={(e) => navigate(`/blogs/${post.slug}`, e)} className="block bg-white p-6 rounded-xl neu-base neu-shadow neu-shadow-hover h-full flex flex-col">
                                <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-lg neu-base mb-4" />
                                <h3 className="text-xl font-heading font-bold text-brand-black mb-2 flex-grow">{post.title}</h3>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <span className="font-bold text-temu-purple hover:underline self-start">Read More &rarr;</span>
                            </a>
                        </AnimatedSection>
                    ))}
                 </div>
            </div>
        </div>
    </>
);
