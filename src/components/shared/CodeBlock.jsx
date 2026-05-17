import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, Download, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CodeBlock = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `code-snippet.${language || 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden border border-slate-700 bg-[#1E1E1E]">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Code size={14} className="text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            {language || 'Texto'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadCode}
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
            title="Descargar"
          >
            <Download size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
            title="Copiar"
          >
            {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </Button>
        </div>
      </div>
      <div className="p-0 text-sm">
        <SyntaxHighlighter
          language={language || 'text'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
