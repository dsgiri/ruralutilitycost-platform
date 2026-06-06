import { useEffect, useRef } from "react";
import { Bot, X, Send } from "lucide-react";
import { useChatbotRouter } from "./useChatbotRouter";
import { RecommendationCard } from "./RecommendationCard";
import { QuickReplies } from "./QuickReplies";
import quickRepliesData from "./quick-replies.json";
import { Link } from "react-router-dom";

export function ChatbotPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { messages, lastResult, input, setInput, sendMessage } = useChatbotRouter();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, lastResult]);

  if (!open) return null;

  return (
    <aside
      role="dialog"
      aria-label="Find the right calculator"
      aria-modal="true"
      className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50 flex flex-col max-h-[600px] h-[80vh]"
    >
      <header className="flex items-start justify-between p-4 bg-[#1a5f3f] text-white rounded-t-2xl gap-3">
        <div className="flex items-start gap-3">
          <Bot className="w-6 h-6 mt-0.5" />
          <div>
            <h3 className="font-semibold leading-tight flex flex-col">
               <span className="block">Find the right calculator.</span>
            </h3>
            <p className="text-xs text-green-100/80 mt-0.5">Tell me what you're trying to estimate.</p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close calculator finder" className="opacity-80 hover:opacity-100 self-start">
          <X className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-4">
          {messages.map((m) => (
             <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                  m.role === 'user'
                    ? 'bg-[#1a5f3f] text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                }`}>
                  <p>{m.text}</p>
                </div>
             </div>
          ))}
        </div>

        {lastResult?.recommendations?.length ? (
          <div className="mt-4 space-y-3">
            {lastResult.recommendations.map((rec: any) => (
              <RecommendationCard key={rec.id} rec={rec} onClose={onClose} />
            ))}
          </div>
        ) : null}

        <div ref={endRef} />
      </div>

      <footer className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-2xl">
        <QuickReplies items={quickRepliesData.quickReplies} onPick={sendMessage} />

        {lastResult?.needs_clarification && lastResult?.clarifying_question ? (
          <div className="mb-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 text-orange-800 dark:text-orange-300 text-sm">
            {lastResult.clarifying_question}
          </div>
        ) : null}

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type what you're trying to estimate..."
            aria-label="Type your calculator question"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="absolute right-2 p-2 text-gray-400 hover:text-[#1a5f3f] disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-3 text-center">
          <Link 
            to="/" 
            onClick={() => {
              import('./analytics').then(({ logChatbotEvent }) => logChatbotEvent('chatbot_browse_all_clicked'));
              onClose();
            }} 
            className="text-xs text-gray-500 hover:text-[#1a5f3f] transition-colors"
          >
            Browse all calculators
          </Link>
        </div>
      </footer>
    </aside>
  );
}
