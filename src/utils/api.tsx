const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

export const fetchCampaigns = async () => {
  try {
    const response = await fetch(`${API_URL}/campaigns`);
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const createAudience = async (audience: object) => {
  try {
    console.log('audienceJson:', JSON.stringify(audience));
    const response = await fetch(`${API_URL}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audience),
    });
    if (!response.ok) {
      throw new Error('Failed to create audience'+ response.statusText);
    }
    return await response.json();
  } catch (error) {
    //don't throw if SyntaxError
    if (error instanceof SyntaxError) {
      return;
  }
    console.error('Error creating audience:', error);
    throw error;}

};

export const checkAudienceSize = async (audience: object) => {
  try {
    const response = await fetch(`${API_URL}/audiences/size`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audience),
    });
    if (!response.ok) {
      throw new Error('Failed to check audience size');
    }
    const data = await response.json();
    return data.size;
  } catch (error) {
    console.error('Error checking audience size:', error);
    throw error;
  }
};
