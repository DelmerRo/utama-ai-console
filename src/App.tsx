// src/App.tsx
import React from 'react';
import { InputColumn } from './components/InputColumn';
import { EnrichmentColumn } from './components/EnrichmentColumn';
import { PromptsColumn } from './components/PromptsColumn';

function App() {
  return (
    <div className="min-h-screen bg-[#f8f6f3] font-sans text-gray-800 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Módulo E-commerce</h1>
          <p className="text-sm text-gray-500 font-medium">Optimización e-Commerce • UTAMA Home & Deco</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Ratio 1:1</span>
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">SEO Ready</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-6 lg:p-8 max-w-[1920px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Columna 1 */}
          <div className="h-full overflow-hidden">
            <InputColumn />
          </div>
          
          {/* Columna 2 */}
          <div className="h-full overflow-hidden">
            <EnrichmentColumn />
          </div>

          {/* Columna 3 */}
          <div className="h-full overflow-hidden">
            <PromptsColumn />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;