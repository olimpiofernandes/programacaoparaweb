export function DeleteData(type, id){
    
        let baseURL = 'http://localhost:4567/api/';
    
        return new Promise((resolve, reject) => {
    
          fetch(baseURL+type+id, {
            method: 'DELETE'
          })
          .then((responseJson) => {
          })
          .catch((error) => {
            reject(error);
          });
    
        });
    }
    