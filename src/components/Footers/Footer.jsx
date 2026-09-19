import react from "react";
import {Rocket, Code2, Mail, MessageSquare, Bug, Star, FileText, Terminal} from lucide-react

export default function Footer() {
return (
    <>
        <footer className="w-full bg-slate-900 border-t border-slate-700/80 text-slate-300 shrink-0 z-20">
            <CtaBanner />
            <LinkGrid />
            <Bottombar />
        </footer>
    </>
)
}

//Top CTA Banner 
function CtaBanner() {
    return (
        <>
            <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 py-10 px-6 sm:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-600/10 border border-blue-400/30 text-blue-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span>100% Free &amp; Open Source</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Ready to land your dream role?
                </h3>
                <p className="text-slate-400 text-sm max-w-xl">
                    Craft your ATS-friendly resume in minutes with MakeCV. No subscriptions, no hidden
                    paywalls, and no watermarks—ever.
                </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                    href="#editor"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-lg active:scale-95"
                >
                    <Rocket size={18} />
                    <span>Start Building Now</span>
                </a>
                <a
                    href="https://github.com/abhiabhish3k/MakeCV.git"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800/70 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors active:scale-95"
                >
                    <Code2 size={18} />
                    <span>Star on GitHub</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 text-[11px] font-mono font-semibold border border-slate-700">
                    1.4k ★
                    </span>
                </a>
                </div>
            </div>
            </div>
        </>
    );
};

//Link Grid for all the links
function LinkGrid() {
    return (
        <>
                <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-sm">
            {/* Brand + socials */}
            <div className="lg:col-span-4 space-y-3.5">
                <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                    <FileText size={18} />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">MakeCV</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                The free, privacy-focused resume builder built for modern software engineers and
                digital professionals. No subscriptions, no telemetry tracking, and zero watermarks.
                </p>
                <div className="flex items-center gap-3 pt-1 text-slate-400">
                <a href="#github" title="GitHub Repository" className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition">
                    <Terminal size={18} />
                </a>
                <a href="#discord" title="Discord Community" className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition">
                    <MessageSquare size={18} />
                </a>
                <a href="#twitter" title="Twitter / X" className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition">
                    <Star size={18} />
                </a>
                </div>
            </div>
        
            {/* About */}
            <div className="lg:col-span-3 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                About MakeCV
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                MakeCV was built to democratize professional career tools. All resume data is stored
                strictly in client-side memory or local browser storage. No servers ever read or log
                your personal identifiable information.
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
                {["100% Client-Side Privacy", "Modern ATS Formats", "Open Source GPL-3.0"].map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                    </li>
                ))}
                </ul>
            </div>
        
            {/* Contact */}
            <div className="lg:col-span-2 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Contact &amp; Help
                </h4>
                <ul className="space-y-2 text-xs text-slate-400">
                <li>
                    <a href="mailto:support.makecv@proton.me" className="hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                    <Mail size={14} />
                    <span>support.makecv@proton.me</span>
                    </a>
                </li>
                <li>
                    <a href="#discord" className="hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                    <MessageSquare size={14} />
                    <span>Discord Community</span>
                    </a>
                </li>
                <li>
                    <a href="#bugs" className="hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                    <Bug size={14} />
                    <span>Report a Bug</span>
                    </a>
                </li>
                </ul>
            </div>
        
            {/* Resources */}
            <div className="lg:col-span-3 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Resources</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#ats-guide" className="hover:text-white transition-colors">ATS Optimization Checklist</a></li>
                <li><a href="#templates" className="hover:text-white transition-colors">Engineering Resume Templates</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
            </div>
            </div>
        </>
    );
};

//Bottom bar for copyright and social links
function Bottombar() {
    return (
        <>
                <div className="border-t border-slate-800 bg-slate-950/60 py-4 px-6 sm:px-12">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <p className="text-center sm:text-left">
                © 2025 MakeCV. Made with care by <span className="text-slate-200 font-medium">Dipan &amp; Abhishek</span>. All rights reserved.
                </p>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-slate-300 font-mono">All systems operational</span>
                </div>
            </div>
            </div>
        </>
    ) ;
};