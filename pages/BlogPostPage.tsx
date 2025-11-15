
import React, { FC } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ArrowLeftIcon } from '../components/Icons';
import { BlogPost } from '../data/blogPosts';
import { Navigator } from '../types';

export const BlogPostPage: FC<{ post: BlogPost; navigate: Navigator }> = ({ post, navigate }) => {
    const PostContent = post.content;
    return (
        <>
            <PageHeader title={post.title} subtitle="Posted in our blog" />
            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                         <a href="/blogs" onClick={(e) => navigate('/blogs', e)} className="inline-flex items-center gap-2 text-temu-purple font-bold mb-8 hover:underline">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Back to Blog
                        </a>
                        <img src={post.image} alt={post.title} className="w-full h-auto max-h-96 object-cover rounded-xl neu-base neu-shadow mb-8"/>
                        <PostContent />
                    </div>
                </div>
            </div>
        </>
    );
};
