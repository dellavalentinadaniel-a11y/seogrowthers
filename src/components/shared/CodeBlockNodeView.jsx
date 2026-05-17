import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Code, Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CodeBlockNodeView = ({ node, updateAttributes, extension }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(node.textContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([node.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `code-snippet.${node.attrs.language || 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <NodeViewWrapper className="relative my-6 rounded-lg overflow-hidden border border-slate-700 bg-[#1E1E1E]">
      {/* Code Block Header (Not editable) */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700 select-none" contentEditable="false">
        <div className="flex items-center gap-2">
          <Code size={14} className="text-slate-400" />
          <select 
            className="text-xs font-semibold uppercase tracking-wider text-slate-300 bg-transparent outline-none border-none cursor-pointer hover:bg-slate-700 rounded p-1"
            value={node.attrs.language || 'text'}
            onChange={event => updateAttributes({ language: event.target.value })}
          >
            <option value="text">Texto / Plano</option>
            <option value="js">JavaScript</option>
            <option value="jsx">React JSX</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="bash">Terminal / Bash</option>
          </select>
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
      
      {/* Editable Content Area */}
      <pre className="p-4 m-0 font-mono text-sm text-slate-300">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockNodeView;
