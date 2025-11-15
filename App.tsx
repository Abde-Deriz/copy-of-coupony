
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
