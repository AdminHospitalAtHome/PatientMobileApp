const tokenUrl =
  'https://hosptial-at-home-js-api.azurewebsites.net/api/createUserToken';
const apiKey = 'L-ur2w5V4MHiMDg0fFWYFmIAKnnNZ_wX22GmN1wqm3k1AzFuQV4nTQ==';
export async function createUser() {
  try {
    const response = await fetch(`${tokenUrl}?code=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user token:', error);
    throw error;
  }
}
