export function EditData(type, editData){
    
        let baseURL = 'http://localhost:4567/api/';
    
        return new Promise((resolve, reject) => {
    
          fetch(baseURL+type, {
            Accept: 'application/json',
            method: 'PUT',
            body: JSON.stringify(editData)
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
    