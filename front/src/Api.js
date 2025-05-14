const API_URL = process.env.REACT_APP_API_URL;

const API_KEY = '9f695216ee90ffc4067b0834cc66c52540f24bb6f2666884ad424edebec34f8b';

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
