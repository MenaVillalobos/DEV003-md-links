import axios from 'axios';

export async function httpRequest (URL) {
  let answer = {
    status: '',
    ok: ''
  }
  return await axios.get(URL)
  .then((response) => {
    answer.status = response.status;
    answer.ok = response.statusText;
    return answer;
  })
  .catch(error => {
    if (error.response) { // status code out of the range of 2xx
      answer.status = error.response.status;
      answer.ok = error.response.statusText;
    } else if (error.request) { // The request was made but no response was received
      answer.status = 'The request was made but no response was received';
      answer.ok = 'Fail';
    } else {// Error on setting up the request
      console.log('Error', error.message);
    }
    return answer;
  });
}