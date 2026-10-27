import React, { useState, useRef } from 'react';
import {
  Upload,
  File,
  Image as ImageIcon,
  FileText,
  Table,
  Download,
  Trash2,
  Copy,
  Check,
  Search,
  Filter,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { UploadedFile, PortfolioState } from '../../../types/portfolio';

interface FileManagerTabProps {
  files: UploadedFile[];
  onAddFile: (file: UploadedFile) => void;
  onDeleteFile: (fileId: string) => void;
  portfolio: PortfolioState;
  onUpdatePortfolio: (updated: Partial<PortfolioState>) => void;
}

export const FileManagerTab: React.FC<FileManagerTabProps> = ({
  files,
  onAddFile,
  onDeleteFile,
  portfolio,
  onUpdatePortfolio
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'pdf' | 'spreadsheet' | 'document'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileType = (mime: string, name: string): UploadedFile['type'] => {
    if (mime.startsWith('image/')) return 'image';
    if (mime.includes('pdf') || name.endsWith('.pdf')) return 'pdf';
    if (mime.includes('sheet') || mime.includes('excel') || name.endsWith('.xlsx') || name.endsWith('.csv'))
      return 'spreadsheet';
    if (mime.includes('word') || name.endsWith('.docx') || name.endsWith('.doc')) return 'document';
    return 'other';
  };

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const type = getFileType(file.type, file.name);

        const newFile: UploadedFile = {
          id: 'file-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          name: file.name,
          size: file.size,
          type,
          mimeType: file.type || 'application/octet-stream',
          dataUrl,
          uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          tag: type === 'image' ? 'Image' : type === 'pdf' ? 'Document' : 'File'
        };

        onAddFile(newFile);
        showActionNotification(`Uploaded "${file.name}" successfully!`);
      };
      reader.readAsDataURL(file);
    });
  };

  const showActionNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleCopyLink = (file: UploadedFile) => {
    navigator.clipboard.writeText(file.dataUrl);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
    showActionNotification(`Copied link for ${file.name}`);
  };

  const handleDownload = (file: UploadedFile) => {
    const a = document.createElement('a');
    a.href = file.dataUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showActionNotification(`Downloaded ${file.name}`);
  };

  const assignAsHeroSlide = (file: UploadedFile) => {
    const newSlide = {
      id: 'slide-' + Date.now(),
      url: file.dataUrl,
      alt: file.name,
      caption: file.name.replace(/\.[^/.]+$/, ''),
      focus: '50% 18%'
    };
    onUpdatePortfolio({
      hero: {
        ...portfolio.hero,
        slides: [newSlide, ...portfolio.hero.slides]
      }
    });
    showActionNotification(`Added "${file.name}" as Hero Profile Slide!`);
  };

  const assignAsQrCode = (file: UploadedFile) => {
    onUpdatePortfolio({
      contact: {
        ...portfolio.contact,
        qrCodeDataUrl: file.dataUrl
      }
    });
    showActionNotification(`Updated QR code with "${file.name}"!`);
  };

  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || f.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 text-[#f2f7f4]">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="p-3 bg-[#19e05f]/20 border border-[#19e05f] text-[#19e05f] rounded-xl flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        className={`relative p-8 rounded-2xl border-2 border-dashed transition-all text-center ${
          isDragging
            ? 'border-[#19e05f] bg-[#19e05f]/10 shadow-lg shadow-[#19e05f22]'
            : 'border-[#1d5a35] bg-[#09150d] hover:border-[#19e05f]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          accept="image/*,.pdf,.xlsx,.csv,.docx,.doc,.txt"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#0b1d12] border border-[#19e05f]/40 flex items-center justify-center text-[#19e05f] shadow-md shadow-[#19e05f15]">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">Upload Images or Any Kind of Files</h4>
            <p className="text-xs text-[#9aaaa0] mt-1 max-w-md mx-auto">
              Drag &amp; drop profile photos, certificates, PDF resumes, Excel duty rosters, or click below to browse device.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 bg-gradient-to-r from-[#19e05f] to-[#7cf0a3] text-[#031007] font-semibold text-xs rounded-xl shadow-md shadow-[#19e05f33] hover:shadow-[#19e05f55] transition-all"
          >
            Select Files to Upload
          </button>
          <div className="text-[11px] text-gray-500 flex flex-wrap gap-2 justify-center">
            <span>Supports: JPG, PNG, WebP, SVG</span>
            <span>•</span>
            <span>PDF Resumes</span>
            <span>•</span>
            <span>Excel Rosters &amp; Budgets (.xlsx, .csv)</span>
            <span>•</span>
            <span>Word Docs</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-[#0a180f] border border-[#16271c] rounded-xl text-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search uploaded files..."
            className="w-full pl-9 pr-3 py-2 bg-[#050e09] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-[#19e05f]"
          />
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Files' },
            { id: 'image', label: 'Images' },
            { id: 'pdf', label: 'PDFs' },
            { id: 'spreadsheet', label: 'Spreadsheets' },
            { id: 'document', label: 'Documents' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterType(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                filterType === cat.id
                  ? 'bg-[#19e05f] text-[#031007] font-semibold'
                  : 'text-gray-400 hover:text-white bg-[#050e09]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Uploaded Files Grid */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{filteredFiles.length} file(s) stored in portal</span>
          <span className="text-[11px] text-[#9aaaa0]">Stored securely in browser memory &amp; state</span>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-xs bg-[#09150d] border border-[#16271c] rounded-2xl">
            No files found matching the criteria. Upload new files above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="p-3.5 rounded-xl bg-[#09150d] border border-[#1d4029] hover:border-[#19e05f]/70 transition-all flex flex-col justify-between text-xs space-y-3"
              >
                {/* Header: Thumbnail + Meta */}
                <div className="flex items-start gap-3">
                  {file.type === 'image' ? (
                    <img
                      src={file.dataUrl}
                      alt={file.name}
                      className="w-14 h-14 object-cover rounded-lg border border-[#19e05f]/30 bg-black shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-[#050e09] border border-[#1d4029] flex items-center justify-center text-[#19e05f] shrink-0">
                      {file.type === 'pdf' ? (
                        <FileText className="w-7 h-7 text-red-400" />
                      ) : file.type === 'spreadsheet' ? (
                        <Table className="w-7 h-7 text-emerald-400" />
                      ) : (
                        <File className="w-7 h-7 text-blue-400" />
                      )}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-white truncate" title={file.name}>
                      {file.name}
                    </h5>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span className="uppercase text-[10px] text-[#19e05f] font-semibold">{file.type}</span>
                    </div>
                    <span className="block text-[10px] text-gray-500 mt-0.5">{file.uploadedAt}</span>
                  </div>
                </div>

                {/* Assignment & Utility Actions */}
                <div className="pt-2 border-t border-[#16271c] space-y-1.5">
                  {file.type === 'image' && (
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => assignAsHeroSlide(file)}
                        className="px-2 py-0.5 rounded bg-[#102a1b] hover:bg-[#19e05f] hover:text-[#031007] text-gray-300 font-medium transition-colors"
                      >
                        + Set as Hero Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => assignAsQrCode(file)}
                        className="px-2 py-0.5 rounded bg-[#102a1b] hover:bg-[#19e05f] hover:text-[#031007] text-gray-300 font-medium transition-colors"
                      >
                        Set as QR
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDownload(file)}
                        className="p-1.5 rounded-lg bg-[#050e09] hover:bg-white/10 text-gray-300 hover:text-white"
                        title="Download file to computer"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(file)}
                        className="p-1.5 rounded-lg bg-[#050e09] hover:bg-white/10 text-gray-300 hover:text-white"
                        title="Copy Data URL"
                      >
                        {copiedId === file.id ? <Check className="w-3.5 h-3.5 text-[#19e05f]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteFile(file.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30"
                      title="Delete file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
