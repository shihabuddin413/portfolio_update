// --- Gemini API Helper ---
/**
 * A helper function to call the Gemini API with exponential backoff.
 * @param {string} userPrompt - The user's prompt.
 * @param {string} systemInstruction - The system prompt.
 * @param {boolean} expectJson - Whether to expect a JSON response.
 * @returns {Promise<string>} - The generated text or JSON string.
 */
export const callGeminiAPI = async (userPrompt, systemInstruction, expectJson = false) => {
  const apiKey = "AIzaSyCwPZPnM1UQScZ3o6INkyjPN52XLc5HS1U"; // As per instructions, leave this empty
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
  };

  if (expectJson) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          "suggestedName": { "type": "STRING" },
          "suggestedEmail": { "type": "STRING" },
          "draftedMessage": { "type": "STRING" }
        },
        required: ["suggestedName", "suggestedEmail", "draftedMessage"]
      }
    };
  }

  let retries = 3;
  let delay = 1000;

  while (retries > 0) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        return candidate.content.parts[0].text; // Return the text (or JSON string)
      } else {
        throw new Error("Invalid response structure from API.");
      }
    } catch (error) {
      console.error("Gemini API call failed:", error);
      retries--;
      if (retries === 0) {
        throw error; // Rethrow last error
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
};

export const refresh = () => {
    window.location.reload()
}