import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Upload,
  FileText,
  Download,
  Trash2,
  Type,
  FileSpreadsheet,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Shield,
} from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Papa from 'papaparse';

let pdfjsLib: typeof import('pdfjs-dist') | null = null;

async function getPdfJs() {
  if (typeof window === 'undefined') return null;
  if (!pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  }
  return pdfjsLib;
}

interface TextAnnotation {
  id: string;
  page: number;
  x: number;
  y: number;
  text: string;
  fontSize: number;
}

export default function PdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; msg: string } | null>(null);
  const [annotations, setAnnotations] = useState<TextAnnotation[]>([]);
  const [addTextMode, setAddTextMode] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [pendingPos, setPendingPos] = useState<{ x: number; y: number } | null>(null);
  const [extractedText, setExtractedText] = useState<string[][]>([]);
  const [showCsvPreview, setShowCsvPreview] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const renderTaskRef = useRef<any>(null);

  const showStatus = (type: 'success' | 'error' | 'info', msg: string) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus(null), 4000);
  };

  const loadPdf = useCallback(async (buffer: ArrayBuffer) => {
    try {
      setLoading(true);
      const pdfjs = await getPdfJs();
      if (!pdfjs) return;
      const pdf = await pdfjs.getDocument({ data: buffer.slice(0) }).promise;
      setNumPages(pdf.numPages);
      setCurrentPage(1);
      setAnnotations([]);
      setExtractedText([]);
      setShowCsvPreview(false);
      showStatus('success', `PDF loaded successfully – ${pdf.numPages} page(s)`);
    } catch (err) {
      console.error(err);
      showStatus('error', 'Failed to load PDF. Please try another file.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFile = async (f: File) => {
    if (!f.type.includes('pdf')) {
      showStatus('error', 'Please upload a PDF file.');
      return;
    }
    setFile(f);
    const buffer = await f.arrayBuffer();
    setPdfBytes(buffer);
    await loadPdf(buffer);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  useEffect(() => {
    if (!pdfBytes || !canvasRef.current) return;
    let cancelled = false;

    (async () => {
      try {
        const pdfjs = await getPdfJs();
        if (!pdfjs || cancelled) return;

        const pdf = await pdfjs.getDocument({ data: pdfBytes.slice(0) }).promise;
        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (renderTaskRef.current) renderTaskRef.current.cancel();

        const task = page.render({ canvasContext: ctx, viewport });
        renderTaskRef.current = task;
        await task.promise;

        annotations
          .filter((a) => a.page === currentPage)
          .forEach((a) => {
            ctx.font = `${a.fontSize * scale}px Helvetica`;
            ctx.fillStyle = '#1a365d';
            ctx.fillText(a.text, a.x * scale, a.y * scale);
          });
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') console.error(err);
      }
    })();

    return () => {
      cancelled = true;
      if (renderTaskRef.current) renderTaskRef.current.cancel();
    };
  }, [pdfBytes, currentPage, scale, annotations]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!addTextMode || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    setPendingPos({ x, y });
  };

  const confirmText = () => {
    if (!pendingPos || !textInput.trim()) return;
    setAnnotations((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        page: currentPage,
        x: pendingPos.x,
        y: pendingPos.y,
        text: textInput.trim(),
        fontSize: 14,
      },
    ]);
    setTextInput('');
    setPendingPos(null);
    setAddTextMode(false);
    showStatus('success', 'Text annotation added');
  };

  const downloadEditedPdf = async () => {
    if (!pdfBytes) return;
    try {
      setLoading(true);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();

      for (const ann of annotations) {
        const page = pages[ann.page - 1];
        if (!page) continue;
        const { height } = page.getSize();
        page.drawText(ann.text, {
          x: ann.x,
          y: height - ann.y,
          size: ann.fontSize,
          font,
          color: rgb(0.1, 0.21, 0.36),
        });
      }

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file ? `edited_${file.name}` : 'edited.pdf';
      a.click();
      URL.revokeObjectURL(url);
      showStatus('success', 'Edited PDF downloaded');
    } catch (err) {
      console.error(err);
      showStatus('error', 'Failed to generate edited PDF');
    } finally {
      setLoading(false);
    }
  };

  const extractToCsv = async () => {
    if (!pdfBytes) return;
    try {
      setLoading(true);
      const pdfjs = await getPdfJs();
      if (!pdfjs) return;

      const pdf = await pdfjs.getDocument({ data: pdfBytes.slice(0) }).promise;
      const allRows: string[][] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const items = content.items as any[];

        const lines: Record<number, { x: number; str: string }[]> = {};
        items.forEach((item) => {
          if (!item.str?.trim()) return;
          const y = Math.round(item.transform[5]);
          if (!lines[y]) lines[y] = [];
          lines[y].push({ x: item.transform[4], str: item.str });
        });

        const sortedYs = Object.keys(lines).map(Number).sort((a, b) => b - a);
        for (const y of sortedYs) {
          const sorted = lines[y].sort((a, b) => a.x - b.x);
          const row = sorted.map((s) => s.str.trim()).filter(Boolean);
          if (row.length) allRows.push(row);
        }
        if (i < pdf.numPages) allRows.push([`--- Page ${i + 1} ---`]);
      }

      setExtractedText(allRows);
      setShowCsvPreview(true);
      showStatus('success', `Extracted ${allRows.length} rows of text`);
    } catch (err) {
      console.error(err);
      showStatus('error', 'Failed to extract text from PDF');
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = () => {
    if (!extractedText.length) return;
    const csv = Papa.unparse(extractedText);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file ? file.name.replace(/\.pdf$/i, '.csv') : 'extracted.csv';
    a.click();
    URL.revokeObjectURL(url);
    showStatus('success', 'CSV downloaded');
  };

  const clearAll = () => {
    setFile(null);
    setPdfBytes(null);
    setNumPages(0);
    setCurrentPage(1);
    setAnnotations([]);
    setExtractedText([]);
    setShowCsvPreview(false);
    setAddTextMode(false);
    setPendingPos(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-navy-50 to-slate-100">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 font-serif">
              PDF Editor & Converter
            </h1>
            <p className="text-slate-600 mt-1">
              View, annotate and convert PDFs to CSV — free professional tools by Alpha and Omega Advisors
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-700 bg-white px-4 py-2 rounded-full shadow-sm border border-navy-100">
            <Shield size={16} className="text-gold-500" />
            Client-side only · Your files never leave your browser
          </div>
        </div>
      </div>

      {/* Status toast */}
      {status && (
        <div
          className={`fixed top-24 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : status.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : status.type === 'error' ? (
            <AlertCircle size={18} />
          ) : (
            <Loader2 size={18} className="animate-spin" />
          )}
          {status.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {!file ? (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-navy-300 rounded-2xl bg-white p-12 text-center hover:border-gold-500 transition-colors cursor-pointer shadow-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <div className="mx-auto w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center mb-5">
              <Upload className="text-navy-800" size={32} />
            </div>
            <h2 className="text-2xl font-semibold text-navy-900 mb-2">Upload a PDF document</h2>
            <p className="text-slate-500 mb-4">Drag & drop or click to select a PDF file</p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Supports viewing, adding text annotations, downloading edited PDFs, and converting text content to CSV
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <h3 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
                  <FileText size={18} /> Document
                </h3>
                <p className="text-sm text-slate-600 truncate mb-1" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-slate-400 mb-4">
                  {(file.size / 1024).toFixed(1)} KB · {numPages} page{numPages !== 1 ? 's' : ''}
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => setAddTextMode(!addTextMode)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      addTextMode
                        ? 'bg-gold-500 text-navy-900'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Type size={16} />
                    {addTextMode ? 'Click on page to place text' : 'Add Text Annotation'}
                  </button>

                  <button
                    onClick={downloadEditedPdf}
                    disabled={loading}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-navy-900 text-white hover:bg-navy-800 transition disabled:opacity-50"
                  >
                    <Download size={16} />
                    Download Edited PDF
                  </button>

                  <button
                    onClick={extractToCsv}
                    disabled={loading}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
                  >
                    <FileSpreadsheet size={16} />
                    Convert to CSV
                  </button>

                  {showCsvPreview && (
                    <button
                      onClick={downloadCsv}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
                    >
                      <Download size={16} />
                      Download CSV
                    </button>
                  )}

                  <button
                    onClick={clearAll}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition"
                  >
                    <Trash2 size={16} />
                    Clear / New File
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <h3 className="font-semibold text-navy-900 mb-3">Navigation</h3>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm font-medium">
                    Page {currentPage} of {numPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                    disabled={currentPage >= numPages}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setScale((s) => Math.max(0.5, s - 0.15))}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <span className="text-sm w-14 text-center">{Math.round(scale * 100)}%</span>
                  <button
                    onClick={() => setScale((s) => Math.min(2.5, s + 0.15))}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>
              </div>

              {annotations.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <h3 className="font-semibold text-navy-900 mb-2">
                    Annotations ({annotations.length})
                  </h3>
                  <ul className="space-y-1 max-h-40 overflow-y-auto text-sm">
                    {annotations.map((a) => (
                      <li key={a.id} className="flex justify-between items-center gap-2 text-slate-600">
                        <span className="truncate">
                          p{a.page}: {a.text}
                        </span>
                        <button
                          onClick={() => setAnnotations((prev) => prev.filter((x) => x.id !== a.id))}
                          className="text-red-500 hover:text-red-700 shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>

            {/* Viewer */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 overflow-auto">
                {loading && (
                  <div className="flex items-center justify-center py-20 text-navy-800">
                    <Loader2 className="animate-spin mr-2" size={24} />
                    Processing…
                  </div>
                )}
                <div className="flex justify-center">
                  <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className={`shadow-md border border-slate-200 ${
                      addTextMode ? 'cursor-crosshair' : 'cursor-default'
                    }`}
                  />
                </div>
              </div>

              {showCsvPreview && extractedText.length > 0 && (
                <div className="mt-4 bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-navy-900 flex items-center gap-2">
                      <FileSpreadsheet size={18} /> CSV Preview
                    </h3>
                    <button
                      onClick={downloadCsv}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <Download size={14} /> Download CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto max-h-64 border border-slate-100 rounded-lg">
                    <table className="min-w-full text-xs">
                      <tbody>
                        {extractedText.slice(0, 50).map((row, i) => (
                          <tr key={i} className={i % 2 ? 'bg-slate-50' : ''}>
                            {row.map((cell, j) => (
                              <td key={j} className="px-2 py-1 border-b border-slate-100 whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {extractedText.length > 50 && (
                      <p className="text-center text-slate-400 py-2 text-xs">
                        Showing first 50 of {extractedText.length} rows
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Text modal */}
      {pendingPos && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-navy-900 mb-3">Add Text Annotation</h3>
            <input
              autoFocus
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmText()}
              placeholder="Enter text to place on the PDF…"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-navy-500/40"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setPendingPos(null);
                  setTextInput('');
                  setAddTextMode(false);
                }}
                className="px-4 py-2 rounded-lg text-sm bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmText}
                className="px-4 py-2 rounded-lg text-sm bg-navy-900 text-white hover:bg-navy-800"
              >
                Place Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
