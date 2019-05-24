import http from './http/axios';

export default {
  // allinfo language
  getIP: (urlPar = {}) =>
    http('GET', `/service/getIpInfo.php`, {
      urlParams: urlPar,
    }),
};
