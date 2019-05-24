// 统一错误处理，可以在这里设置样式等
export const handleError = err => {
  if (err.response.status) {
    switch (err.response.status) {
      case 401:
        console.log('401');
        break;
      case 403:
        console.log('登录超时');
        break;
      // 404 请求不存在
      case 404:
        console.log('404 请求不存在');
        break;
      default:
        console.log(err.response.data.message);
    }
  }
};
