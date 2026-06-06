import React, { useEffect, useRef, useState } from 'react';
import { SEO } from '../components/SEO';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Obfuscate in source code to prevent static scraping
    const u = 'remindtag';
    const d = 'gmail.com';
    const em = `${u}@${d}`;

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const isHighContrast = document.documentElement.classList.contains('high-contrast');
      
      let textColor = isDark ? '#6ee7b7' : '#1a5f3f';
      if (isHighContrast) {
        textColor = isDark ? '#ffffff' : '#000000';
      }

      // Safe fallback system fonts
      const fontSize = 16; 
      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
      
      const metrics = ctx.measureText(em);
      canvas.width = metrics.width + 4;
      canvas.height = fontSize + 6;
      
      // Re-set font and color after canvas resize
      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.textBaseline = 'top';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(em, 2, 4);
    };

    draw();
    
    // Listen for theme / contrast changes to update the canvas text color
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const handleEmailClick = () => {
    const u = 'remindtag';
    const d = 'gmail.com';
    window.location.href = `mailto:${u}@${d}`;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Web3Forms access key
    formData.append("access_key", "d142097c-37aa-4c3c-9377-2ce75f9df222");
    // Optional configuration
    formData.append("subject", "New Contact from Rural Utility Cost");
    formData.append("from_name", "Rural Utility Cost - Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setSubmitMessage("Thank you for reaching out! We'll get back to you shortly.");
        form.reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage("Network error. Please try again or use the email below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 w-full max-w-4xl mx-auto flex-grow flex flex-col mt-4 mb-16">
      <SEO 
        title="Contact Us | Rural Utility Cost" 
        description="Contact the team at Rural Utility Cost with questions, feedback, or legal inquiries." 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        <div className="flex flex-col justify-center">
          <div className="bg-[#1a5f3f]/10 dark:bg-[#1a5f3f] w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-[#1a5f3f] dark:text-[#6ee7b7]" />
          </div>
          
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Have a question about our calculators, want to report an issue, or need clarification on calculations? Reach out to our team directly.
          </p>
          
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/50 rounded-xl mb-8">
            <p><strong>Note:</strong> We cannot provide specific structural engineering advice, official cost estimates, or regulatory sign-offs. Please consult a licensed local professional for specific builds.</p>
          </div>

          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={handleEmailClick} 
            title="Click to email"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter') handleEmailClick(); }}
          >
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Direct Email:</div>
            <div className="flex justify-center items-center opacity-80 group-hover:opacity-100 transition-opacity">
              <canvas ref={canvasRef} style={{ height: '22px' }} aria-label="Email address image" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
          
          {submitStatus === 'success' ? (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 dark:text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Message Sent</h3>
              <p className="text-emerald-600 dark:text-emerald-400">{submitMessage}</p>
              <button 
                onClick={() => setSubmitStatus('idle')}
                className="mt-6 text-emerald-700 dark:text-emerald-400 font-medium hover:underline focus:outline-none"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Optional bot-check honeypot */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] dark:focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] dark:focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] dark:focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-y"
                  placeholder="How can we help?"
                ></textarea>
              </div>

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{submitMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#1a5f3f] hover:bg-[#134930] disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
