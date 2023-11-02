const getUserTokenUrl = 'https://hosptial-at-home-js-api.azurewebsites.net/api/getUserToken';



export function getUserToken(userId:string): Promise<any> {
    const urlWithParams = new URL(getUserTokenUrl);
    urlWithParams.searchParams.append('userId', userId);
    const promise: Promise<any> = new Promise((resolve, reject) => {
      fetch(
        urlWithParams.toString(),
      ).then(response => response.json())
      .then(json => {
        resolve(json)
      });
    });
    return promise;
  }
// Function to get user token by userId
// export async function getUserToken(userId: string) {
//     try {
//         const response = await fetch(getUserTokenUrl, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ userId })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching user token:', error);
//         throw error;
//     }
// }
