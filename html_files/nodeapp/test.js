const axios = require('axios');

const newData = {
  key: 'exampleKey',
  value: 'exampleValue'
};

axios.post('http://localhost:3000/saveData', newData)
  .then(response => {
    console.log('Data saved successfully:', response.data);
  })
  .catch(error => {
    console.error('Error saving data:', error.response.data);
  });
