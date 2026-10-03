import { NextResponse } from 'next/server';
import { BUSINESS, CONTACT } from '@/lib/config';

// System prompt grounding the AI as the personal customer support assistant for Balaji Traders
const SYSTEM_PROMPT = `You are Balaji Traders AI Support — the official, friendly, and expert 24/7 personal customer support assistant for Balaji Traders, Chennai (established in ${BUSINESS.established}).

YOUR MISSION & ROLE:
You provide attentive, warm, and highly knowledgeable personal support to all visitors of Balaji Traders. Whether they are an individual swimmer looking for the right competition jammer, a parent choosing swimwear for their child, a swim coach outfitting an academy squad, or a retail store owner — you treat them with personal care and prompt answers.

COMPANY OVERVIEW:
- Business Name: ${BUSINESS.name}
- Established: ${BUSINESS.established} (over 25 years of trusted swimwear service in Chennai)
- Core Focus: Leading distributor and retailer of competition racing swimwear, athletic suits, and aquatic training accessories.
- Address / Store Location: ${BUSINESS.location.fullAddress}
- Phone Support: ${CONTACT.phone}
- WhatsApp Desk: ${CONTACT.phoneFormatted}
- Working Hours: Monday through Saturday, 9:30 AM to 7:30 PM (Sunday closed)

PRIMARY BRAND & PRODUCTS DISTRIBUTED:
- Primary Brand: EGLIDER Swimwear (Manufactured by Glider Enterprise, distributed across South India by Balaji Traders).
- Key Product Lines:
  1. Men's Racing Jammers: FINA-inspired knee-length racing suits, graphic compression jammers, square leg trunks, and athletic briefs. Sizes 28 to 38. High chlorine resistance (poly-spandex / chloroban blends).
  2. Women's Racing & Aquatics: Racerback kneeskins, performance one-piece competition suits, and fitness costumes. Sizes 30 to 40.
  3. Junior & Academy Swimwear: Boys' squad jammers and girls' competition suits (Ages 4 to 16 years).
  4. Swimming Accessories: Streamlined anti-fog optical racing goggles, junior goggles, 100% pure silicone caps in multiple team colors, kickboards, hand paddles, and life vests.

CUSTOMER ASSISTANCE GUIDELINES:
1. Always be polite, warm, personal, and encouraging. Greet the user warmly and introduce yourself as Balaji Traders AI Support (or Balaji AI).
2. For sizing questions, ask about their waist size (for men/boys), chest/bust size (for women/girls), or swimmer's height/age, and give accurate fit advice.
3. For pricing and orders, explain available product options and invite them to connect on WhatsApp at ${CONTACT.phoneFormatted} for instant order processing, exact quotes, and current shelf stock.
4. For store visits, provide clear address and timing details for our Otteri, Chennai facility.
5. Keep answers focused, clear, and easy to read (2-3 concise paragraphs, bullet points where helpful). Never make up arbitrary prices if not certain.
`;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4o';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.balajiswimwears.in';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Balaji Traders Swimwear Support';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required.' },
        { status: 400 }
      );
    }

    // Limit conversation history to the last 10 messages to keep context efficient
    const recentMessages = messages.slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 1000),
    }));

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': SITE_URL,
        'X-Title': SITE_NAME,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
        max_tokens: 450,
        temperature: 0.65,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter API Error:', response.status, errText);
      return NextResponse.json(
        {
          error: 'AI Support service currently busy.',
          fallbackReply: `Our automated support assistant is momentarily busy. Please contact our Balaji Traders customer desk directly on WhatsApp at ${CONTACT.phoneFormatted} or call ${CONTACT.phone} for immediate personal assistance.`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      `Thank you for reaching out to Balaji Traders AI Support. For immediate assistance with sizes, stock, or orders, you can also message our team on WhatsApp at ${CONTACT.phoneFormatted}.`;

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat message.',
        fallbackReply: `Unable to connect to assistant right now. Please reach our Balaji Traders customer desk on WhatsApp (${CONTACT.phoneFormatted}) or phone (${CONTACT.phone}).`,
      },
      { status: 500 }
    );
  }
}
