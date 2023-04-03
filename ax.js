import axios from 'axios';
import colors from 'colors';

export async function httpRequest (URL) {
  let answer = {
    status: '',
    ok: ''
  }
  axios.get(URL)
  .then((response) => {
    // answer = `${"STATUS:".underline.blue} ${response.status} ${response.statusText.underline.blue}`;
    // console.log(`${URL}   ${answer}`);
    answer.status = response.status;
    answer.ok = response.statusText;
    return answer;
  }).catch(error => {
    if (error.response) { // status code out of the range of 2xx
      // answer = `${"STATUS:".underline.red} ${error.response.status} ${error.response.statusText.underline.red}`;
      // console.log(`${URL}   ${answer}`);
      answer.status = error.response.status;
      answer.ok = error.response.statusText;
    } else if (error.request) { // The request was made but no response was received
      // answer = 'The request was made but no response was received'.underline.red;
      // console.log(`${URL}   ${answer}`);
      answer.status = 'The request was made but no response was received';
      answer.ok = 'Fail';
    } else {// Error on setting up the request
      console.log('Error', error.message);
    }
    return answer;
  });
}
// Iterar arreglo, cada it mandar llamar función