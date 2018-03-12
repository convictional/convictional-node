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
  }
}
