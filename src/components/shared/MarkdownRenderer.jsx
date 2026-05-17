import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
import CodeBlock from '@/components/shared/CodeBlock';

const MarkdownRenderer = ({ content }) => {
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  const options = {
    replace: (domNode) => {
      // Tiptap often wraps code blocks in <pre><code>...</code></pre>
      if (domNode.name === 'pre' && domNode.children && domNode.children[0] && domNode.children[0].name === 'code') {
        const codeNode = domNode.children[0];
        
        // Helper to extract plain text from nodes
        const getText = (node) => {
          if (node.type === 'text') return node.data;
          if (node.children) return node.children.map(getText).join('');
          return '';
        };
        
        const codeContent = getText(codeNode);
        
        // Extract language from className (e.g. "language-js")
        let language = 'text';
        if (codeNode.attribs && codeNode.attribs.class) {
          const match = codeNode.attribs.class.match(/language-(\w+)/);
          if (match) {
            language = match[1];
          }
        }
        
        return <CodeBlock code={codeContent} language={language} />;
      }
    }
  };

  return (
    <div className="prose prose-invert prose-lg max-w-none 
      prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-24
      prose-p:text-gray-300 prose-p:leading-8 
      prose-a:text-[#00d9ff] prose-a:no-underline hover:prose-a:underline 
      prose-strong:text-white prose-strong:font-bold
      prose-blockquote:border-l-4 prose-blockquote:border-[#00d9ff] prose-blockquote:bg-slate-900/50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:text-cyan-100
      prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-800
      prose-li:text-gray-300
      prose-code:text-[#00d9ff] prose-code:bg-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded
      prose-table:border prose-table:border-slate-800 prose-th:bg-slate-900 prose-th:p-4 prose-td:p-4 prose-tr:border-b prose-tr:border-slate-800"
    >
      {isHtml ? (
        parse(content, options)
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline ? (
                <CodeBlock 
                  code={String(children).replace(/\n$/, '')} 
                  language={match ? match[1] : 'text'} 
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MarkdownRenderer;
