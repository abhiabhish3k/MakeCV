import { useState, useEffect, useRef } from "react";
import DownloadButton from "./Downloadbutton.jsx";
import {
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Pencil,
  Code2,
  Check,
  ChevronDown,
} from "lucide-react";

function ZoomControls({ zoom, onZoomIn, onZoomOut, onZoomReset }) {
  return (
    <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
      <button
        onClick={onZoomOut}
        title="Zoom out"
        className="p-1 rounded hover:bg-white text-slate-500 hover:text-slate-900 transition active:scale-95"
      >
        <ZoomOut size={15} />
      </button>
      <span className="text-xs font-mono px-2 text-blue-700 font-medium w-10 text-center">
        {zoom}%
      </span>
      <button
        onClick={onZoomIn}
        title="Zoom in"
        className="p-1 rounded hover:bg-white text-slate-500 hover:text-slate-900 transition active:scale-95"
      >
        <ZoomIn size={15} />
      </button>
      <div className="w-px h-3.5 bg-slate-300 mx-1" />
      <button
        onClick={onZoomReset}
        title="Reset view"
        className="p-1 rounded hover:bg-white text-slate-500 hover:text-slate-900 transition active:scale-95"
      >
        <RotateCcw size={15} />
      </button>
    </div>
  );
}

const templates = [
  { id: "Modern Tech", value: "modernTemplate" },
  { id: "Minimal", value: "minimalTemplate" },
  { id: "Classic", value: "classicTemplate" },
];


function TemplateSelector({ selected, onSelect, isSelecting = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close the dropdown when clicking outside of it or pressing Escape.
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  // Find the template object matching the currently selected value, so we
  // can show its friendly label in the trigger chip. Falls back to the
  // first template if nothing (or an unknown value) is selected yet.
  const activeTemplate =
    templates.find((t) => t.value === selected) ?? templates[0];

  const handleSelect = (value) => {
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <div ref={containerRef} className="relative hidden md:flex items-center gap-2">
      {/* Trigger — styled to match the original static chip */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        disabled={isSelecting}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span className="text-slate-400">
          <Pencil size={14} />
        </span>
        <span className="font-medium text-slate-700">Template</span>
        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-blue-700 text-[10px] font-mono">
          {activeTemplate.id}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-40"
        >
          {templates.map((template) => {
            const isActive = template.value === activeTemplate.value;
            return (
              <button
                key={template.value}
                role="menuitem"
                onClick={() => handleSelect(template.value)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 transition"
              >
                <span className={isActive ? "font-medium text-slate-900" : "text-slate-600"}>
                  {template.id}
                </span>
                {isActive && <Check size={14} className="text-blue-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Header({
  zoom,
  onZoomIn,
  onZoomOut,
  onRotate,
  onZoomReset,
  selectedTemplate,
  onSelectTemplate,
}) {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-slate-200 shadow-sm z-30">
      {/* Brand */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            <FileText size={16} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900 hidden sm:inline">
            MakeCV
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-blue-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wide">Live</span>
        </div>
      </div>

      {/* Template selector (center) */}
      <TemplateSelector selected={selectedTemplate} onSelect={onSelectTemplate} />

      {/* Right controls */}
      <div className="flex items-center gap-2.5">
        <ZoomControls
          zoom={zoom}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onZoomReset={onZoomReset}
        />

        <a
          href="https://github.com/abhiabhish3k/MakeCV.git"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition text-sm active:scale-95"
        >
          <Code2 size={15} />
          <span>Open Source</span>
          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500 font-semibold font-mono">
            1.4k ★
          </span>
        </a>

        <DownloadButton />
      </div>
    </header>
  );
}

export default Header;