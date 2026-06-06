import { describe, it, expect } from "vitest";
import { classifyIntent } from "./routing";

describe("Chatbot Intent Routing", () => {
  it("detects generator planning", () => {
    const result = classifyIntent("How long will my generator run?");
    expect(result.primary_intent).toBe("generator_planning");
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it("detects pain point prioritization", () => {
    const result = classifyIntent("What should I fix first?");
    expect(result.primary_intent).toBe("pain_point_prioritization");
  });

  it("handles out of scope / nonsense gracefully", () => {
    const result = classifyIntent("Can you write a poem about apples?");
    expect(result.primary_intent).toBe("general_browse");
    expect(result.recommendations[0].id).toBe("calculator-directory");
  });
  
  it("safely handles conversational shorthand", () => {
    const result = classifyIntent("nope");
    expect(result.primary_intent).toBe("general_browse");
    expect(result.confidence).toBe(1); // Hardcoded fallback for 'nope'
  });
});
