module.exports = {
  convertParams: (obj) => {
    var params = '?' + Object.keys(obj).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }).join('&')
    return params
  }
}
