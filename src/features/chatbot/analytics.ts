export function logChatbotEvent(eventName: string, properties?: Record<string, any>) {
  // Safe operational events only: intent detected, clarification shown, link clicked
  // No raw sensitive transcripts are sent to third parties.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Chatbot Analytics] ${eventName}`, properties);
  }
  
  // TODO: Implement your actual production analytics here (e.g., PostHog, Google Analytics, Mixpanel)
  // Example: 
  // if (window.posthog) window.posthog.capture(eventName, properties);
}
