
import React, { useState, useEffect, useCallback, FC } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

import { blogPosts } from './data/blogPosts';
import { Navigator } from './types';

// --- CONFIGURATION ---
const AFFILIATE_LINK = "#";

const App: FC = () => {
    // --- STATE ---
    const [revealedCodes, setRevealedCodes] = useState(new Set<string>());
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    // --- ROUTING ---
     useEffect(() => {
        const onPopState = () => setCurrentPath(window.location.pathname);
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const navigate: Navigator = useCallback((path: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
            setCurrentPath(path);
            window.scrollTo(0, 0);
        }
    }, []);

    // --- SEO META TAGS ---
    useEffect(() => {
        const defaultMeta = {
            title: "Coupony: Your Hub for Amazing Deals & Promo Codes",
            description: "Welcome to Coupony! Find the latest verified coupon codes, including exclusive Temu offers, product reviews, and saving tips to help you shop smarter.",
            keywords: "Coupony, coupon codes, promo codes, discounts, deals, Temu coupon code 2025, savings",
            ogTitle: "Coupony: Your Hub for Amazing Deals & Promo Codes",
            ogDescription: "Your exclusive gateway to massive savings! Get verified promo codes for Temu and more, plus expert shopping tips from Coupony.",
            ogImage: "https://picsum.photos/1200/630?random=1",
            twitterTitle: "Coupony: Your Hub for Amazing Deals & Promo Codes",
            twitterDescription: "Don't miss out! Use our limited-time discount codes for your favorite stores and learn how to save big with Coupony.",
            twitterImage: "https://picsum.photos/1200/600?random=2",
        };

        const updateMetaTag = (selector: string, content: string) => {
            const element = document.querySelector(selector) as HTMLMetaElement | null;
            if (element) {
                element.content = content;
            }
        };

        const generateKeywords = (title: string): string => {
            const commonWords = new Set(['a', 'an', 'the', 'in', 'on', 'for', 'with', 'how', 'to', 'and', 'at', 'is', 'of', 'via', 'other', 'channels']);
            const titleWords = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
            const keywords = titleWords.filter(word => !commonWords.has(word) && word.length > 2);
            return ['coupony', ...new Set(keywords)].join(', ');
        };

        const applyMeta = (meta: Partial<typeof defaultMeta>) => {
            document.title = meta.title || defaultMeta.title;
            updateMetaTag('meta[name="description"]', meta.description || defaultMeta.description);
            updateMetaTag('meta[name="keywords"]', meta.keywords || defaultMeta.keywords);
            updateMetaTag('meta[property="og:title"]', meta.ogTitle || defaultMeta.ogTitle);
            updateMetaTag('meta[property="og:description"]', meta.ogDescription || defaultMeta.ogDescription);
            updateMetaTag('meta[property="og:image"]', meta.ogImage || defaultMeta.ogImage);
            updateMetaTag('meta[name="twitter:title"]', meta.twitterTitle || defaultMeta.twitterTitle);
            updateMetaTag('meta[name="twitter:description"]', meta.twitterDescription || defaultMeta.twitterDescription);
            updateMetaTag('meta[name="twitter:image"]', meta.twitterImage || defaultMeta.twitterImage);
            updateMetaTag('meta[property="og:url"]', window.location.href);
        };

        const slug = currentPath.startsWith('/blogs/') ? currentPath.substring('/blogs/'.length) : null;
        const post = slug ? blogPosts.find(p => p.slug === slug) : null;
        
        if (post) {
            const newTitle = `${post.title} | Coupony`;
            applyMeta({
                title: newTitle,
                description: post.excerpt,
                keywords: generateKeywords(post.title),
                ogTitle: newTitle,
                ogDescription: post.excerpt,
                ogImage: post.image,
                twitterTitle: newTitle,
                twitterDescription: post.excerpt,
                twitterImage: post.image
            });
        } else if (currentPath === '/blogs') {
             applyMeta({
                title: 'The Coupony Blog | Tips, Tricks, and Savings',
                description: 'Explore The Coupony Blog for the latest tips, tricks, and reviews to help you shop smarter and save more.',
            });
        } else if (currentPath === '/about') {
             applyMeta({
                title: 'About Coupony | Your Trusted Source for Deals',
                description: "Learn about Coupony's mission to help you save money and shop smarter with the best and most reliable coupon codes online.",
            });
        } else {
            applyMeta(defaultMeta);
        }

    }, [currentPath]);

    // --- HANDLERS ---
    const handleRevealAndCopy = (code: string) => {
        setRevealedCodes(prev => new Set(prev).add(code));
        navigator.clipboard.writeText(code).then(() => {
            setCopiedCode(code);
            window.open(AFFILIATE_LINK, '_blank');
            setTimeout(() => setCopiedCode(null), 3000);
        });
    };

    // --- PAGE RENDER ---
    const renderPage = () => {
        const homePageProps = {
            onReveal: handleRevealAndCopy,
            copiedCode,
            revealedCodes,
            navigate
        };

        if (currentPath === '/') {
            return <HomePage {...homePageProps} />;
        }
        if (currentPath === '/categories') {
            return <CategoriesPage />;
        }
        if (currentPath === '/blogs') {
            return <BlogListPage navigate={navigate} />;
        }
        if (currentPath.startsWith('/blogs/')) {
            const slug = currentPath.substring('/blogs/'.length);
            const post = blogPosts.find(p => p.slug === slug);
            if (post) {
                return <BlogPostPage post={post} navigate={navigate} />;
            }
            // Fallback to blog list if post not found
            return <BlogListPage navigate={navigate} />;
        }
        if (currentPath === '/about') {
            return <AboutPage />;
        }
        if (currentPath === '/privacy-policy') {
            return <PrivacyPolicyPage />;
        }
        if (currentPath === '/terms-of-service') {
            return <TermsOfServicePage />;
        }

        // 404 Not Found - render home page
        return <HomePage {...homePageProps} />;
    };

    return (
        <>
            <Header currentPath={currentPath} navigate={navigate} />
            <main>{renderPage()}</main>
            <Footer navigate={navigate} />
        </>
    );
};

export default App;
