import axios from 'axios';
import colors from 'colors';

axios.get('https://youtube.com/menOmis')
  .then((response) => {
    console.log(response.statusText + '  ' + response.status);
  }).catch(error => {
    if (error.response) { // status code out of the range of 2xx
      console.log("Status:  ".bgRed + error.response.status);
    } else if (error.request) { // The request was made but no response was received
      console.log('he request was made but no response was received'.underline.red);
    } else {// Error on setting up the request
      console.log('Error', error.message);
    }
  });
