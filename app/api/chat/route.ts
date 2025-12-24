import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

export const runtime = 'edge'

const languageNames: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  te: 'Telugu',
  mr: 'Marathi',
  ta: 'Tamil',
  gu: 'Gujarati',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi',
  or: 'Odia',
  as: 'Assamese',
  ur: 'Urdu',
  sa: 'Sanskrit',
}

const orderDatabase = {
  'ORD123456': {
    orderId: 'ORD123456',
    status: 'Delivered',
    customerName: 'Rajesh Kumar',
    items: ['Samsung Galaxy S23', 'Phone Case'],
    total: '₹74,999',
    orderDate: '2025-12-15',
    deliveryDate: '2025-12-20',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    trackingNumber: 'TRK987654321',
  },
  'ORD789012': {
    orderId: 'ORD789012',
    status: 'In Transit',
    customerName: 'Priya Sharma',
    items: ['Nike Running Shoes', 'Sports Socks'],
    total: '₹5,499',
    orderDate: '2025-12-20',
    estimatedDelivery: '2025-12-26',
    address: '456 Park Street, Kolkata, West Bengal 700016',
    trackingNumber: 'TRK123456789',
  },
  'ORD345678': {
    orderId: 'ORD345678',
    status: 'Processing',
    customerName: 'Amit Patel',
    items: ['Dell Laptop', 'Wireless Mouse', 'Laptop Bag'],
    total: '₹65,999',
    orderDate: '2025-12-22',
    estimatedDelivery: '2025-12-28',
    address: '789 CG Road, Ahmedabad, Gujarat 380009',
    trackingNumber: 'TRK456789012',
  },
}

export async function POST(req: Request) {
  const { messages, language = 'en' } = await req.json()

  const languageName = languageNames[language] || 'English'

  const systemPrompt = `You are a helpful and friendly order confirmation agent for an e-commerce platform in India. You assist customers with:
- Order confirmations and status
- Order tracking
- Delivery information
- Cancellations and returns
- Payment inquiries
- General customer support

IMPORTANT: You MUST respond in ${languageName} language. Always respond in ${languageName}, even if the user writes in English or another language.

Available order data in the system:
${JSON.stringify(orderDatabase, null, 2)}

Guidelines:
1. Always be polite, professional, and empathetic
2. Respond ONLY in ${languageName} language
3. If a customer provides an order ID, look it up in the database and provide detailed information
4. For order tracking, provide the tracking number and current status
5. For cancellations, explain the cancellation policy (within 24 hours of order placement)
6. For returns, explain the return policy (within 15 days of delivery for most items)
7. Use Indian Rupees (₹) for all pricing
8. Use appropriate cultural context for India
9. If you don't have information about an order, politely ask for the order ID or other details
10. Suggest common order IDs if they need examples: ORD123456, ORD789012, ORD345678

Remember: You must communicate ONLY in ${languageName}. This is critical for customer satisfaction.`

  const result = await streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: systemPrompt,
    messages,
    temperature: 0.7,
    maxTokens: 1024,
  })

  return result.toDataStreamResponse()
}
