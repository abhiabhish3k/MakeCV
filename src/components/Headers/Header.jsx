import react from 'react'
import {
    FileText, ZoomIn, ZoomOut, RotateCcw, Download, Pencil, Code2
} from 'lucide-react'

function ZoomControls({ zoom, onZoomIn, onZoomOut, onZoomReset}) {
    return (
        <>
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
    </>
    );
}

function Header({ zoom, onZoomIn, onZoomOut, onRotate, onDownload, onZoomReset }) {

    return (
        <>  
        <header className = "h-14 shrink-0 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-slate-200 shadow-sm z-30">
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
            <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm">
                <span className="text-slate-400">
                    <Pencil size={14} />
                </span>
                <span className="font-medium text-slate-700">Template</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-blue-700 text-[10px] font-mono">
                    Modern Tech
                </span>
                </div>
            </div>
            
            {/* Right controls */}
            <div className="flex items-center gap-2.5">
                <ZoomControls />
        
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
        
                <button
                onClick={onDownload}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-sm font-medium transition shadow-sm active:scale-95"
                >
                <Download size={15} />
                <span className="hidden sm:inline">Download CV</span>
                </button>
            </div>
        </header>
        </>
    )
}

export default Header