const localUrl = 'http://localhost:1337';

const fetchData = (url, config) => {
  console.log(url,config.method);
  return fetch(url, config).then((r) => {
    return r.json().then((result) => {
      if (parseInt(r.status) === 200) {
        return result;
      }
      throw {status: r.status, err: result};
    });
  }).catch((error)=>{ throw error });
};

const get = (path, hdrs, disableUrl) => {
  console.log("called get 000=======")
  const url = (disableUrl)
    ? path
    : (localUrl + path);
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, hdrs)
  };
  return fetchData(url, config);
};

const post = (path, requestBody, hdrs, disableUrl) => {
  const url = (disableUrl)
    ? path
    : (localUrl + path);

  const config = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(requestBody),
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, hdrs)
  };

  return fetchData(url, config);
};


const deleteReq = (path, requestBody, hdrs, disableUrl) => {
  const url = (disableUrl)
    ? path
    : (localUrl + path);

  const config = {
    method: 'DELETE',
    credentials: 'include',
    
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, hdrs)
  };

  return fetchData(url, config);
};


const put = (path, requestBody, hdrs, disableUrl) => {
  const url = (disableUrl)
    ? path
    : (localUrl + path);

  const config = {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(requestBody),
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, hdrs)
  };

  return fetchData(url, config);
};

module.exports = {
  get,
  post,
  put,
  deleteReq
};
