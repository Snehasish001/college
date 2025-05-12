const API_URL = process.env.REACT_APP_API_URL;

const API_KEY = 'ab25d9fbe2728f0530d5365afb8de1f935bcd84cf24044f8c5d5432d7e400d94';

export const getData = async (endpoint) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${API_KEY}`
      }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
};
