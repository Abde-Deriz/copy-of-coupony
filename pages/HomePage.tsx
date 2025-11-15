
import React, { FC, useState, useCallback, ReactNode } from 'react';
import { blogPosts } from '../data/blogPosts';
import { Navigator } from '../types';
import { AnimatedSection } from '../components/AnimatedSection';
import { CheckIcon, GiftIcon, ShieldCheckIcon, SparklesIcon, StarIcon, TruckIcon, VerifiedIcon } from '../components/Icons';

// --- HELPER COMPONENTS (Scoped to HomePage) ---

const CouponCodeBox: FC<{ 
    code: string; 
    onReveal: (code: string) => void;
    isRevealed: boolean;
    isCopied: boolean; 
    description?: string 
}> = ({ code, onReveal, isRevealed, isCopied, description }) => (
    <div className="bg-white p-4 rounded-xl neu-base neu-shadow-yellow">
        {description && <span className="block text-gray-500 font-semibold uppercase tracking-wider text-xs mb-2 text-center">{description}</span>}
        <button
            onClick={() => onReveal(code)}
            className={`w-full flex items-center justify-center text-lg font-bold py-3 px-6 rounded-lg neu-base neu-shadow-sm neu-shadow-sm-hover focus:outline-none relative transition-all duration-200 ${
                isRevealed 
                ? 'bg-temu-yellow/20 border-2 border-dashed border-temu-purple text-temu-purple text-3xl font-heading tracking-widest' 
                : 'bg-temu-orange text-white'
            }`}
            style={{ minHeight: '60px' }}
        >
            {isRevealed ? code : 'Click to Get Code'}
            {isCopied && (
                <span className="absolute inset-0 flex items-center justify-center bg-green-400 text-brand-black text-lg rounded-md">
                    <CheckIcon className="h-6 w-6 mr-2" /> Copied!
                </span>
            )}
        </button>
    </div>
);

const CountdownTimer = () => {
    const calculateTimeLeft = useCallback(() => {
        const endOfDay = new Date();
        endOfDay.setDate(endOfDay.getDate() + 1);
        endOfDay.setHours(23, 59, 59, 999);
        const difference = +endOfDay - +new Date();
        return difference > 0 ? {
            H: Math.floor((difference / (1000 * 60 * 60)) % 24),
            M: Math.floor((difference / 1000 / 60) % 60),
            S: Math.floor((difference / 1000) % 60),
        } : {};
    }, []);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    React.useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="flex items-center justify-center space-x-3 md:space-x-4">
            {Object.entries(timeLeft).map(([interval, value]) => (
                <div key={interval} className="text-center bg-white p-3 rounded-md neu-base neu-shadow">
                    <span className="text-2xl md:text-4xl font-heading font-bold text-temu-purple leading-none">{String(value).padStart(2, '0')}</span>
                    <span className="block text-xs uppercase text-gray-500">{interval}</span>
                </div>
            ))}
        </div>
    );
};

const FaqItem: FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg neu-base neu-shadow-sm mb-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left text-lg font-bold text-brand-black p-5 focus:outline-none">
                <span>{q}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-temu-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-gray-600 leading-relaxed px-5 pb-5">{a}</p>
            </div>
        </div>
    );
};

const WavyDivider: FC<{className?: string}> = ({className}) => (
    <div className={`bg-gray-50 ${className}`}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-24" fill="#5E17EB">
            <path d="M0,50 C360,120 1080,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
    </div>
);


// --- PAGE SECTIONS ---

const HeroSection: FC<{ onReveal: (code: string) => void; copiedCode: string | null; revealedCodes: Set<string> }> = ({ onReveal, copiedCode, revealedCodes }) => {
    const offers = [
      { title: '$30 Off Coupon', description: 'Get a flat $30 discount on your entire order. Perfect for big savings!', code: 'TAKE30', color: 'bg-temu-yellow', shadowColor: 'var(--temu-yellow)' },
      { title: 'Free Welcome Gifts', description: 'Claim a special pack of free items with your first qualifying purchase.', code: 'GIFTNOW', color: 'bg-temu-orange', shadowColor: 'var(--temu-orange)' },
      { title: '$100 Gift Bundle', description: 'Unlock a massive bundle of coupons and items worth over $100.', code: 'BUNDLE100', color: 'bg-temu-purple', textColor: 'text-white', shadowColor: 'var(--brand-black)' }
    ];

    return (
        <section id="home" className="relative bg-temu-purple text-white py-20 md:py-32 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="50" cy="50" r="2" fill="white"/><path d="M50 0 v100 M0 50 h100" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-heading font-extrabold leading-tight mb-4 drop-shadow-lg">Exclusive Temu Coupon Codes for 2025</h1>
                <p className="text-lg md:text-xl text-temu-yellow font-bold mb-12">Grab $30 off, free welcome gifts, or a massive $100 gift bundle. Your ultimate savings start here!</p>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-brand-black">
                    {offers.map(offer => {
                        const isRevealed = revealedCodes.has(offer.code);
                        const isCopied = copiedCode === offer.code;
                        return (
                            <div key={offer.code} className={`p-6 rounded-xl neu-base neu-shadow-hover flex flex-col text-left h-full ${offer.color} ${offer.textColor || ''}`} style={{'--tw-shadow-color': offer.shadowColor, boxShadow: `6px 6px 0 var(--brand-black)`} as React.CSSProperties}>
                                <h3 className="text-2xl font-heading font-bold mb-2">{offer.title}</h3>
                                <p className="flex-grow mb-4">{offer.description}</p>
                                <button
                                    onClick={() => onReveal(offer.code)}
                                    className={`w-full font-bold py-3 px-4 rounded-lg neu-base neu-shadow-sm neu-shadow-sm-hover focus:outline-none transition-all duration-200 relative ${
                                        isRevealed 
                                        ? 'bg-white/50 border-2 border-dashed border-brand-black text-brand-black text-2xl font-heading tracking-widest'
                                        : 'bg-white text-brand-black'
                                    }`}
                                     style={{ minHeight: '52px' }}
                                >
                                   {isRevealed ? offer.code : 'Show Code'}
                                    {isCopied && (
                                        <span className="absolute inset-0 flex items-center justify-center bg-green-400 text-brand-black text-lg rounded-md">
                                            <CheckIcon className="h-6 w-6 mr-2" /> Copied!
                                        </span>
                                    )}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

const HowToUseSection: FC = () => (
    <section id="how-to-use" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">How to Claim Your Discount</h2>
                <p className="text-gray-600 text-lg mb-12">It's easy as 1-2-3! Follow these simple steps to save big.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {[{
                    title: "Click for Code",
                    description: "Click the 'Show Code' button. The code is copied and Temu opens in a new tab for you."
                }, {
                    title: "Shop on Temu",
                    description: "Browse millions of amazing items and add your favorites to your shopping cart."
                }, {
                    title: "Paste and Save",
                    description: "At checkout, find the 'Apply coupon code' box and paste your code. Your discount is applied instantly!"
                }].map((step, index) => (
                    <AnimatedSection key={index}>
                        <div className="bg-white p-8 rounded-xl h-full neu-base neu-shadow neu-shadow-hover">
                            <div className="bg-temu-yellow text-brand-black w-16 h-16 rounded-full flex items-center justify-center text-3xl font-heading font-bold mx-auto mb-6 neu-base neu-shadow-sm">{index + 1}</div>
                            <h3 className="text-xl font-bold text-brand-black mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
);

const WhyTemuSection: FC = () => {
    const features = [
        { icon: SparklesIcon, title: "Limitless Selection", desc: "From fashion to electronics, find everything you need in one place." },
        { icon: ShieldCheckIcon, title: "Quality Guaranteed", desc: "Temu works with top suppliers to ensure high-quality standards. Shop with confidence." },
        { icon: GiftIcon, title: "90-Day Returns", desc: "Not satisfied? Temu offers a money-back guarantee with easy, hassle-free returns." },
        { icon: TruckIcon, title: "Fast & Free Shipping", desc: "Enjoy complimentary shipping on almost all orders, delivered reliably to your doorstep." },
    ];
    return (
        <section id="why-temu" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">Why Millions Love Temu</h2>
                    <p className="text-gray-600 text-lg mb-12">Discover where quality meets affordability. Your coupon code unlocks even more value.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                       <AnimatedSection key={i}>
                            <div className="text-center p-6 h-full bg-gray-50 rounded-lg neu-base neu-shadow neu-shadow-hover">
                                <feature.icon className="w-12 h-12 mx-auto text-temu-purple mb-4" />
                                <h3 className="text-xl font-bold text-brand-black mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                       </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FaqSection: FC = () => {
    const faqs = [
        { q: "How do I use the Temu coupon code?", a: "Simply copy the code from our site, click 'Shop Now' to visit Temu, and paste the code at checkout to apply your 30% discount and claim your free gifts." },
        { q: "Is this Temu promo code for new users?", a: "This exclusive offer is primarily for new users to give them the best welcome experience. However, Temu occasionally extends offers to existing users, so it's always worth a try!" },
        { q: "What is the 100-item gift bundle?", a: "The gift bundle is a curated selection of popular items and coupons worth over $100. It's automatically added to your account after your first qualifying purchase using our promo code." },
        { q: "Does the Temu 30% off code expire?", a: "Yes, this is a limited-time offer for 2025. We recommend using it as soon as possible. The countdown timer on our page shows how much time is left." },
    ];

    return (
        <section id="faq" className="py-16 md:py-24 bg-gray-50">
             <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-lg mb-12">Have questions? We've got answers.</p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <AnimatedSection>
                        {faqs.map((faq, index) => <FaqItem key={index} q={faq.q} a={faq.a} />)}
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection: FC = () => {
    const testimonials = [
        { name: "Jessica L.", comment: "Couldn't believe the discount actually worked! Saved over $30 on my first order. Amazing deal!", image: "https://picsum.photos/100/100?random=3" },
        { name: "Mark T.", comment: "Was skeptical, but this is legit. Checkout was smooth and the discount was instant. Highly recommend!", image: "https://picsum.photos/100/100?random=4" },
    ];
    return (
        <section id="testimonials" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">What Our Users Say</h2>
                    <p className="text-gray-600 text-lg mb-12">Real savings from real people who used our code.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((t) => (
                        <AnimatedSection key={t.name}>
                            <div className="bg-white p-6 rounded-lg neu-base neu-shadow h-full">
                                <div className="flex items-center mb-4">
                                    <img src={t.image} alt={`Testimonial from ${t.name}`} className="w-14 h-14 rounded-full mr-4 border-2 border-brand-black"/>
                                    <div>
                                        <h4 className="font-bold text-brand-black">{t.name}</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-temu-yellow" />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{t.comment}"</p>
                                <div className="mt-4 flex items-center text-green-600 text-sm font-bold">
                                    <VerifiedIcon className="w-5 h-5 mr-1" />
                                    <span>Verified Buyer</span>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FinalCtaSection: FC<{ onReveal: (code: string) => void; copiedCode: string | null; revealedCodes: Set<string> }> = ({ onReveal, copiedCode, revealedCodes }) => (
    <section id="final-cta" className="relative bg-temu-purple text-white py-20 md:py-32">
        <WavyDivider className="absolute top-0 left-0 -translate-y-full"/>
        <div className="container mx-auto px-6 text-center relative">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-4">Your Discount is Waiting!</h2>
            <p className="text-lg md:text-xl text-temu-yellow font-bold mb-8">This Offer Expires Soon – Don't Miss Out!</p>
            <div className="mb-8">
                <CountdownTimer />
            </div>
            <div className="max-w-md mx-auto mb-8">
                <CouponCodeBox 
                    code="BUNDLE100"
                    onReveal={onReveal}
                    isRevealed={revealedCodes.has("BUNDLE100")}
                    isCopied={copiedCode === "BUNDLE100"}
                    description="Get Your $100 Gift Bundle"
                />
            </div>
        </div>
    </section>
);

const HomePageBlogSection: FC<{ navigate: Navigator }> = ({ navigate }) => {
    const postsToShow = blogPosts.slice(0, 2);

    return (
        <section id="blog-preview" className="py-16 md:py-24 bg-gray-50">
             <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">Fresh From The Blog</h2>
                    <p className="text-gray-600 text-lg mb-12">Get the latest tips, tricks, and reviews to help you shop smarter.</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-12">
                   {postsToShow.map(post => (
                        <AnimatedSection key={post.title}>
                             <a href={`/blogs/${post.slug}`} onClick={(e) => navigate(`/blogs/${post.slug}`, e)} className="block md:flex items-center gap-8 bg-white p-6 rounded-xl neu-base neu-shadow neu-shadow-hover transition-transform duration-300">
                                <img src={post.image} alt={post.title} className="w-full md:w-1/3 h-48 object-cover rounded-lg neu-base mb-4 md:mb-0" />
                                <div className="md:w-2/3">
                                    <h3 className="text-2xl font-heading font-bold text-brand-black mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <span className="font-bold text-temu-purple hover:underline">Read More &rarr;</span>
                                </div>
                            </a>
                        </AnimatedSection>
                   ))}
                </div>
                <div className="text-center mt-12">
                    <a href="/blogs" onClick={(e) => navigate('/blogs', e)} className="inline-block bg-temu-orange text-white text-lg font-bold py-3 px-8 rounded-lg neu-base neu-shadow-yellow neu-shadow-yellow-hover">
                        Visit The Blog
                    </a>
                </div>
            </div>
        </section>
    );
};


export const HomePage: FC<{ onReveal: (code: string) => void; copiedCode: string | null; revealedCodes: Set<string>; navigate: Navigator; }> = ({ onReveal, copiedCode, revealedCodes, navigate }) => {
    return (
        <>
            <HeroSection onReveal={onReveal} copiedCode={copiedCode} revealedCodes={revealedCodes} />
            <HowToUseSection />
            <WhyTemuSection />
            <FaqSection />
            <TestimonialsSection />
            <HomePageBlogSection navigate={navigate} />
            <FinalCtaSection onReveal={onReveal} copiedCode={copiedCode} revealedCodes={revealedCodes} />
        </>
    );
};
