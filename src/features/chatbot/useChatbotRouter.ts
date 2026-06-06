import { useState } from "react";
import { classifyIntent } from "./routing";
import { sanitizeInput } from "./security-checks";
import { logChatbotEvent } from "./analytics";
import type { ChatMessage } from "./chat-types";

function uid() {
  return Math.random().toString(36).slice(2);
}

export function useChatbotRouter() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      text: "Tell me what you're trying to estimate, fix, or compare, and I'll point you to the best calculator."
    }
  ]);

  const [lastResult, setLastResult] = useState<ReturnType<typeof classifyIntent> | null>(null);
  const [input, setInput] = useState("");

  const sendMessage = (text?: string) => {
    const rawValue = text ?? input;
    const value = sanitizeInput(rawValue);
    
    if (!value) return;

    // Log the user's attempt safely
    logChatbotEvent("chatbot_message_sent", { 
      intent_hint: value.slice(0, 30) // Only log a safe snippet for analytics
    });

    const classification = classifyIntent(value);

    // Track intent classification results
    logChatbotEvent("chatbot_intent_classified", {
      primary_intent: classification.primary_intent,
      confidence: classification.confidence,
      needs_clarification: classification.needs_clarification
    });

    let assistantText = classification.needs_clarification
      ? classification.clarifying_question || "One quick question will help narrow it down."
      : "Here are the best calculator matches:";

    if (!classification.needs_clarification && classification.recommendations.length === 1 && classification.recommendations[0].id === 'calculator-directory') {
       assistantText = "I can only recommend calculators on RuralUtilityCost.com. Try the browse-all calculators option.";
    }

    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", text: value },
      {
        id: uid(),
        role: "assistant",
        text: assistantText,
        kind: classification.needs_clarification ? "clarify" : "text"
      }
    ]);

    setLastResult(classification);
    setInput("");
  };

  return {
    messages,
    lastResult,
    input,
    setInput,
    sendMessage
  };
}
