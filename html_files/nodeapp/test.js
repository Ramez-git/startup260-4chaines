const axios = require('axios');

const entryIdToDelete = '657be450d912499890630264';

axios.delete(`http://localhost:3000/deleteData/${entryIdToDelete}`)
  .then(response => {
    console.log('Data deleted successfully:', response.data);
  })
  .catch(error => {
    if (error.response) {
      console.error('Error deleting data:', error.response.data);
    } else if (error.request) {
      console.error('No response received from the server');
    } else {
      console.error('Error in making the request:', error.message);
    }
  });
