module.exports = {
  convertParams: (obj) => {
    var params = '?' + Object.keys(obj).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }).join('&')
    return params
  },
  getSpliceLength: (length) => {
    if (length >= 100) {
      return 100
    } else {
      return length
    }
  },
  requestHandler: (reject, happyPath) => {
    return (error, res, body) => {
      if (error) {
        reject(error)
      } else if (res.statusCode >= 299) {
        if (body.error) {
          reject(new Error(body.error + ' Code: ' + res.statusCode))
        } else {
          reject(new Error('A problem occurred with the request. Code: ' + res.statusCode))
        }
      } else {
        happyPath(res, body)
      }
    }
  }
}
