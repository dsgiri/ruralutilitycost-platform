import React from 'react';
import { AdUnit } from '../components/AdUnit';

export default function AdsDemo() {
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold dark:text-white mb-4">AdSense Monetization Layout Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
          This page demonstrates the available AdSense placements and how they balance revenue with user experience. 
          Each placement is designed to be responsive, safe for content, and prevent layout shifts.
        </p>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">1. Header Ad</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Placed after the main title but before the reading content begins. Full width, maximum visibility without scrolling.
            </p>
          </div>

          <AdUnit slot="demo-header-ad" placement="header" />

          <div className="prose dark:prose-invert max-w-none mt-8 mb-8 text-gray-800 dark:text-gray-200">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-8 mt-12 bg-green-50 dark:bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2. In-content Ad</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Placed naturally between sections of text. Good for breaking up long blocks of content.
            </p>
          </div>

          <AdUnit slot="demo-in-content-ad" placement="in-content" />

          <div className="prose dark:prose-invert max-w-none mt-8 mb-8 text-gray-800 dark:text-gray-200">
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
            </p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-8 mt-12 bg-green-50 dark:bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">3. Mid-article Ad</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Similar to in-content, but has a tighter max-width to center it pleasantly inside standard article bodies.
            </p>
          </div>

          <AdUnit slot="demo-mid-article-ad" placement="mid-article" />

          <div className="prose dark:prose-invert max-w-none mt-8 mb-8 text-gray-800 dark:text-gray-200">
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores 
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            </p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">4. End-of-content Ad (Footer)</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Placed statically at the bottom. Highly visible as users finish reading the primary task. 
              Also placed sitewide above the global footer in the layout.
            </p>
          </div>

          <AdUnit slot="demo-end-ad" placement="end-of-content" />

        </div>

        {/* Desktop Sidebar Area */}
        <div className="w-80 hidden lg:block border-l border-gray-200 dark:border-gray-800 pl-8 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Sidebar Ad</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Only visible on desktop screens (hidden below `lg` breakpoint). Sticky positions scroll naturally and lock into place.
            </p>
            
            <AdUnit slot="demo-sidebar-ad" placement="sidebar" />
          </div>
        </div>

      </div>
    </div>
  );
}
