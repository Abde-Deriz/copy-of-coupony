
import React, { FC } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ArrowLeftIcon } from '../components/Icons';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { Navigator } from '../types';

export const BlogPostPage: FC<{ post: BlogPost; navigate: Navigator }> = ({ post, navigate }) => {
    const PostContent = post.content;

    // Get up to two other random posts to suggest
    const suggestedPosts = blogPosts
        .filter(p => p.slug !== post.slug)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

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

                    {/* Suggested Posts & Back to Home */}
                    <div className="mt-16">
                        {suggestedPosts.length > 0 && (
                            <div className="max-w-5xl mx-auto mb-16">
                                <h2 className="text-3xl font-heading font-bold text-brand-black mb-8 text-center">You Might Also Like</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {suggestedPosts.map(suggestedPost => (
                                        <a key={suggestedPost.slug} href={`/blogs/${suggestedPost.slug}`} onClick={(e) => navigate(`/blogs/${suggestedPost.slug}`, e)} className="block bg-gray-50 p-6 rounded-xl neu-base neu-shadow neu-shadow-hover h-full flex flex-col">
                                            <img src={suggestedPost.image} alt={suggestedPost.title} className="w-full h-48 object-cover rounded-lg neu-base mb-4" />
                                            <h3 className="text-xl font-heading font-bold text-brand-black mb-2 flex-grow">{suggestedPost.title}</h3>
                                            <span className="font-bold text-temu-purple hover:underline self-start mt-auto">Read More &rarr;</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                         <div className="text-center">
                            <a href="/" onClick={(e) => navigate('/', e)} className="inline-block bg-temu-orange text-white text-lg font-bold py-3 px-8 rounded-lg neu-base neu-shadow-yellow neu-shadow-yellow-hover">
                                Back to Home
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
