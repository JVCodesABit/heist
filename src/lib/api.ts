const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function askMeera(
  message: string,
  evidenceType: string,
  conversationHistory: Array<{ role: string; text: string }>
): Promise<{ response: string | null }> {
  try {
    const res = await fetch(`${API_BASE}/api/meera`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, evidenceType, conversationHistory }),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
  } catch {
    return { response: null };
  }
}
