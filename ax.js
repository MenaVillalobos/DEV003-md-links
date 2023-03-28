import axios from 'axios';
import colors from 'colors';

export function httpRequest (URL) {
  let answer = "";
  axios.get(URL)
  .then((response) => {
    answer = "Status:".bgCyan + " " + response.status + ' ' + response.statusText
    console.log(answer);
  }).catch(error => {
    if (error.response) { // status code out of the range of 2xx
      answer = "Status:  ".bgRed + error.response.status;
      console.log(answer);
    } else if (error.request) { // The request was made but no response was received
      answer = 'The request was made but no response was received'.underline.red;
      console.log(answer);
    } else {// Error on setting up the request
      console.log('Error', error.message);
    }
  });
  return answer;
}
// Iterar arreglo, cada it mandar llamar función