// File: api/google-proxy.js

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Fetch the hidden Google Script URL from Vercel's secure environment variables
  const GOOGLE_SCRIPT_URL = process.env.HIDDEN_SCRIPT_URL;

  try {
    // Forward the data from your website to Google
    const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: new URLSearchParams(req.body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await googleResponse.json();
    
    // Send Google's response back to your website
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to connect to backend' });
  }
}
