import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Eye, Edit2 } from 'lucide-react'

const MarkdownEditor = ({ value, onChange, placeholder = "Write your notes in Markdown..." }) => {
  const [viewMode, setViewMode] = useState('split') // 'edit', 'preview', 'split'

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">Notes (Markdown)</label>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setViewMode('edit')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'edit' 
                ? 'bg-white text-pink-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Edit mode"
          >
            <Edit2 className="h-3 w-3 inline mr-1" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'split' 
                ? 'bg-white text-pink-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Split view"
          >
            Split
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'preview' 
                ? 'bg-white text-pink-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Preview mode"
          >
            <Eye className="h-3 w-3 inline mr-1" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className={`border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-transparent ${
        viewMode === 'split' ? 'grid grid-cols-1 md:grid-cols-2' : ''
      }`}>
        {/* Editor */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'border-r border-gray-300' : ''}`}>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full h-48 md:h-64 px-4 py-3 resize-none border-0 focus:ring-0 focus:outline-none font-mono text-sm"
              style={{ fontFamily: 'monospace' }}
            />
            {viewMode === 'split' && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-300 text-xs text-gray-500">
                Markdown supported: **bold**, *italic*, lists, links, etc.
              </div>
            )}
          </div>
        )}

        {/* Preview */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'overflow-y-auto' : ''} bg-gray-50`}>
            <div className="h-48 md:h-64 px-4 py-3 overflow-y-auto prose prose-sm max-w-none 
              prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
              prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-3 prose-h1:mt-4
              prose-h2:text-xl prose-h2:font-bold prose-h2:mb-2 prose-h2:mt-3
              prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-3
              prose-p:text-gray-700 prose-p:my-2
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline
              prose-ul:my-2 prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-700 prose-ul:space-y-1
              prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-700 prose-ol:space-y-1
              prose-li:my-1 prose-li:text-gray-700 prose-li:pl-0">
              {value ? (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-3 mt-4 text-gray-900" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2 mt-3 text-gray-900" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2 mt-3 text-gray-900" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2 space-y-1 text-gray-700" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2 space-y-1 text-gray-700" {...props} />,
                    li: ({node, ...props}) => <li className="my-1 text-gray-700" {...props} />,
                    a: ({node, ...props}) => <a className="text-pink-600 no-underline hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                  }}
                >
                  {value}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-400 italic">{placeholder}</p>
              )}
            </div>
            {viewMode === 'split' && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-300 text-xs text-gray-500">
                Preview
              </div>
            )}
          </div>
        )}
      </div>

      {/* Markdown Help */}
      <div className="mt-2 text-xs text-gray-500">
        <details className="cursor-pointer">
          <summary className="hover:text-pink-600">Markdown tips</summary>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-1 font-mono text-xs">
            <div><strong>**bold**</strong> or <strong>__bold__</strong></div>
            <div><em>*italic*</em> or <em>_italic_</em></div>
            <div>- List item</div>
            <div>[Link text](https://example.com)</div>
            <div># Heading 1</div>
            <div>## Heading 2</div>
          </div>
        </details>
      </div>
    </div>
  )
}

export default MarkdownEditor

