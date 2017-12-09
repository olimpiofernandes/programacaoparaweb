export function PostData(type, userData){
    
        let baseURL = 'http://localhost:4567/api/';
    
        return new Promise((resolve, reject) => {
    
          fetch(baseURL+type, {
            Accept: 'application/json',
            method: 'POST',
            body: JSON.stringify(userData)
          })
          .then((response) => response.json())
          .then((responseJson) => {
            resolve(responseJson);
          })
          .catch((error) => {
            reject(error);
          });
    
        });
    }
    