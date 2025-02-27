import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { prompt, context } = await req.json()

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        You are a Japanese language tutor. Respond in Japanese with natural and appropriate expressions.
        Current context: ${context}
        User input: ${prompt}
        
        Provide response in the following JSON format:
        {
          "japanese": "Japanese response",
          "reading": "Reading in hiragana",
          "english": "English translation",
          "explanation": "Brief grammar/vocabulary explanation"
        }
      `,
    })

    return new Response(text, { status: 200 })
  } catch (error) {
    return new Response("Error processing chat request", { status: 500 })
  }
}

