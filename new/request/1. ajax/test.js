ajax({
  type: 'GET',
  url: 'http://localhost:3000/posts',
  timeout: 1000,
  success: data => {
    console.log('success', data);
  },
  error: err => {
    console.log('error', err);
  },
});





//4.监听状态变化
xmlHttp.onreadystatechange = () => {
  // 判断当前状态改变是请求完毕的状态吗
  if (xmlHttp.readyState === 4) {
    if (xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status ==
      304) {
      console.log("成功的接收到服务器返回的数据");
    } else {
      console.log("不成功！");
    }
  }
}