import { useState, useRef, useEffect } from 'react';
import react  from 'react'
import { Download, ChevronDown, FileText, FileType, FileCode2 } from 'lucide-react'

{/* 
    This component is a download button that allows users to export their CV.
    It includes a dropdown menu with different export options.
*/}

const Export_options = [
    { name: 'pdf', icon: FileText, label: 'Export as PDF', hint: 'Recommended for printing and sharing' },
    { name: 'docx', icon: FileType, label: 'Export as DOCX', hint: 'Good for editing and formatting' },
    { name: 'html', icon: FileCode2, label: 'Export as HTML', hint: 'Good for web publishing' },
    { name: 'json', icon: FileCode2, label: 'Export as JSON', hint: 'Good for data exchange and integration' },
    { name: 'txt', icon: FileText, label: 'Export as TXT', hint: 'Good for plain text and simple formatting' },
];

export default function DownloadButton({ onExport, isExporting = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    //Close the dropdown when clicking outside of it or escape key is pressed
    useEffect(() => {
        if(!isOpen) return;
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        }
    },[isOpen]);

const handleExport = (format) => {
    setIsOpen(false);
    onExport(format);
};

return (
    <div ref={containerRef} className="relative inline-flex">
        {/* Split button with main export button and dropdown toggle */}
        <div className="inline-flex rounded-lg shadow-sm">
            <button
                onClick = {() => handleExport('pdf')}
                disabled = {isExporting}
                 className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white pl-3.5 pr-3 py-1.5 rounded-l-lg text-sm font-medium transition active:scale-95"
            >
                 <Download size={15} />
                 <span className="hidden sm:inline">{isExporting ? "Exporting…" : "Export CV"}</span>
            </button>


            <button 
            onClick={() => setIsOpen((e) => !e)}
             disabled={isExporting}
             aria-haspopup="menu"
             aria-expanded={open}
             className="flex items-center bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-2 py-1.5 rounded-r-lg border-l border-white/20 transition active:scale-95"
            >
                 <ChevronDown size={15} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
        </div>

        {/* Dropdown menu */}

        {isOpen && (
            <div
                role = "menu"
                className= "absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-40"
            >
                {/** Here, .map() repeats the menu items for each export option */}
                {Export_options.map(({ format, label, hint, icon: Icon }) => (
                    <button
                        key={format}
                        role="menuitem"
                        onClick={() => handleExport(format)}
                        className="w-full flex items-start gap-2.5 px-3 py-2.5 text-left hover:bg-slate-50 transition"
                    >
                         <Icon size={16} className="text-blue-600 mt-0.5 shrink-0" />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-slate-900">{label}</span>
                            <span className="block text-xs text-slate-400">{hint}</span>
                        </span>
                    </button>
                ))}

            </div>
        )
        }
    </div>
)
}

