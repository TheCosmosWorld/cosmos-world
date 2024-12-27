import { getRecentTransactions } from "./webhook";

const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

type HeliusTokenTransfer = {
  fromUserAccount: string;
  toUserAccount: string;
  tokenAmount: number;
};

type HeliusTransaction = {
  signature: string;
  timestamp: number;
  type: string;
  tokenTransfers: HeliusTokenTransfer[];
};

type Transaction = {
  signature: string;
  timestamp: number;
  amount: number;
  type: string;
  from: string;
  to: string;
};

// Keep track of last successful response
let lastSuccessfulResponse: Transaction[] | null = null;

async function fetchHeliusTransactions(): Promise<Transaction[]> {
  console.log('🔑 Checking Helius credentials:', { 
    hasApiKey: !!HELIUS_API_KEY, 
    hasTokenAddress: !!TOKEN_ADDRESS,
    hasLastSuccessfulData: !!lastSuccessfulResponse
  });

  if (!HELIUS_API_KEY || !TOKEN_ADDRESS) {
    console.warn('⚠️ Missing Helius API key or token address, returning last known data or empty array');
    return lastSuccessfulResponse || [];
  }

  try {
    console.log('📡 Fetching from Helius API...');
    const response = await fetch(
      `https://api.helius.xyz/v0/addresses/${TOKEN_ADDRESS}/transactions?api-key=${HELIUS_API_KEY}&limit=50`
    );

    if (response.status === 429) {
      console.warn('⚠️ Rate limit hit, returning last known data');
      return lastSuccessfulResponse || [];
    }

    if (!response.ok) {
      console.error(`❌ Helius API error: ${response.status} ${response.statusText}`);
      return lastSuccessfulResponse || [];
    }

    const data = await response.json() as HeliusTransaction[];
    console.log('📥 Helius API response:', { count: data.length });

    // Transform Helius data to match our transaction format
    const transformed = data.map((event) => ({
      signature: event.signature,
      timestamp: event.timestamp,
      amount: event.tokenTransfers?.[0]?.tokenAmount || 0,
      type: event.type,
      from: event.tokenTransfers?.[0]?.fromUserAccount || "",
      to: event.tokenTransfers?.[0]?.toUserAccount || "",
    }));

    // Update last successful response
    lastSuccessfulResponse = transformed;
    console.log('✅ Transformed transactions:', { count: transformed.length });
    return transformed;
  } catch (error) {
    console.error('❌ Error fetching from Helius:', error);
    return lastSuccessfulResponse || [];
  }
}

export default async function handler(req: Request) {
  console.log('📊 Transactions endpoint called', {
    method: req.method,
    url: req.url
  });
  
  const url = new URL(req.url);
  const type = url.searchParams.get('type');

  if (req.method !== "GET") {
    console.log('❌ Invalid method:', req.method);
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Get webhook transactions (recent inputs)
    const webhookTransactions = getRecentTransactions();
    console.log('📥 Webhook transactions:', { count: webhookTransactions.length });

    // If type is 'recent', only return webhook transactions
    if (type === 'recent') {
      console.log('✅ Returning recent transactions:', {
        webhookCount: webhookTransactions.length,
        timestamp: new Date().toISOString()
      });

      return new Response(JSON.stringify(webhookTransactions), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Otherwise, get transactions from both sources for history
    const heliusTransactions = await fetchHeliusTransactions();
    console.log('📥 Helius transactions:', { count: heliusTransactions.length });

    // Combine and deduplicate transactions
    const allTransactions = [...webhookTransactions, ...heliusTransactions];
    const uniqueTransactions = Array.from(
      new Map(allTransactions.map(tx => [tx.signature, tx])).values()
    );

    // Sort by timestamp, most recent first
    const sortedTransactions = uniqueTransactions.sort((a, b) => b.timestamp - a.timestamp);

    console.log('✅ Returning all transactions:', {
      webhookCount: webhookTransactions.length,
      heliusCount: heliusTransactions.length,
      totalCount: sortedTransactions.length,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify(sortedTransactions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(JSON.stringify({
      message: "Internal server error",
      error: errorMessage
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 
