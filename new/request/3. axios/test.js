const axios = require('axios');

axios
  .get('http://localhost:3000/posts')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


// 发送GET请求
// axios.get('http://localhost:3000/posts?ID=123').then(function (response) {
//   console.log(response);
// }).catch(function (error) {
//   console.log(error);
// });

// 发送POST请求
// axios.post('http://localhost:3000/posts', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// }).then(function (response) {
//   console.log('response', response);
// }).catch(function (error) {
//   console.log(error);
// });


