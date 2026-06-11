const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a helpful assistant for Trent Education Centre (TEC), an education provider based in Nottingham, UK. You help prospective and current students, parents, and partners with questions about courses, admissions, student life, and general information about TEC.

Guidelines:
- Be friendly, professional, and concise
- Answer based on the provided context when available
- If you don't know the answer, say so clearly and suggest contacting TEC directly
- For urgent matters (welfare, complaints), always direct users to contact staff
- Do not invent information about fees, dates, or specific requirements
- TEC contact: info@trenteducation.co.uk | Castle Boulevard, Nottingham

When context from documents is provided, cite the source document name briefly.`;

async function chatWithContext(messages, contextChunks, { stream = false } = {}) {
  const contextBlock = contextChunks.length > 0
    ? `\n\nRelevant information from TEC knowledge base:\n${contextChunks.map((c, i) => `[${i + 1}] (from "${c.document_name}")\n${c.content}`).join('\n\n')}`
    : '';

  const systemWithContext = contextBlock
    ? `${SYSTEM_PROMPT}${contextBlock}`
    : SYSTEM_PROMPT;

  if (stream) {
    return anthropic.messages.stream({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      thinking: { type: 'adaptive' },
      system: systemWithContext,
      messages,
    });
  }

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 1024,
    thinking: { type: 'adaptive' },
    system: systemWithContext,
    messages,
  });

  const text = response.content.find(b => b.type === 'text')?.text || '';
  return { text, inputTokens: response.usage.input_tokens, outputTokens: response.usage.output_tokens };
}

module.exports = { chatWithContext };
