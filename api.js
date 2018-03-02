const request = require('request')
module.exports = {
  getOrder: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/orders/' + id,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  getOrders: (query, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/orders' + query,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  postOrder: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/orders',
        headers: { 'Authorization': apiKey },
        method: 'POST',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  postOrders: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putOrders = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/orders',
              headers: { 'Authorization': apiKey },
              method: 'POST',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putOrders(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Created': recordLength })
          }
        }
        putOrders(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/orders',
          headers: { 'Authorization': apiKey },
          method: 'POST',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  putOrder: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/orders/' + record._id,
        headers: { 'Authorization': apiKey },
        method: 'PUT',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  putOrders: (records, apiKey) => {
    var recordLength = records.length
    return new Promise((resolve, reject) => {
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putOrders = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/orders',
              headers: { 'Authorization': apiKey },
              method: 'PUT',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putOrders(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Modified': recordLength })
          }
        }
        putOrders(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/orders',
          headers: { 'Authorization': apiKey },
          method: 'PUT',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  deleteOrder: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/orders/' + id,
        headers: { 'Authorization': apiKey },
        method: 'DELETE'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  deleteOrders: (ids, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/orders',
        headers: { 'Authorization': apiKey },
        method: 'DELETE',
        json: ids
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  getProduct: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/products/' + id,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  getProducts: (query, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/products' + query,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  postProduct: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/products',
        headers: { 'Authorization': apiKey },
        method: 'POST',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  postProducts: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putProducts = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/products',
              headers: { 'Authorization': apiKey },
              method: 'POST',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putProducts(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Created': recordLength })
          }
        }
        putProducts(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/products',
          headers: { 'Authorization': apiKey },
          method: 'POST',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  putProduct: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/products/' + record._id,
        headers: { 'Authorization': apiKey },
        method: 'PUT',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  putProducts: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putProducts = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/products',
              headers: { 'Authorization': apiKey },
              method: 'PUT',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putProducts(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Modified': recordLength })
          }
        }
        putProducts(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/products',
          headers: { 'Authorization': apiKey },
          method: 'PUT',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  deleteProduct: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/products/' + id,
        headers: { 'Authorization': apiKey },
        method: 'DELETE'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  deleteProducts: (ids, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/products',
        headers: { 'Authorization': apiKey },
        method: 'DELETE',
        json: ids
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  getPartner: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/partners/' + id,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  getPartners: (query, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/partners' + query,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  postPartner: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/partners',
        headers: { 'Authorization': apiKey },
        method: 'POST',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  postPartners: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putPartners = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/partners',
              headers: { 'Authorization': apiKey },
              method: 'POST',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putPartners(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Created': recordLength })
          }
        }
        putPartners(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/partners',
          headers: { 'Authorization': apiKey },
          method: 'POST',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  putPartner: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/partners/' + record._id,
        headers: { 'Authorization': apiKey },
        method: 'PUT',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  putPartners: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putPartners = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/partners',
              headers: { 'Authorization': apiKey },
              method: 'PUT',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putPartners(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Modified': recordLength })
          }
        }
        putPartners(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/partners',
          headers: { 'Authorization': apiKey },
          method: 'PUT',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  deletePartner: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/partners/' + id,
        headers: { 'Authorization': apiKey },
        method: 'DELETE'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  deletePartners: (ids, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/partners',
        headers: { 'Authorization': apiKey },
        method: 'DELETE',
        json: ids
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  getPrice: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/prices/' + id,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  getPrices: (query, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/prices' + query,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  postPrice: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/prices',
        headers: { 'Authorization': apiKey },
        method: 'POST',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  postPrices: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putPrices = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/prices',
              headers: { 'Authorization': apiKey },
              method: 'POST',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putPrices(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Created': recordLength })
          }
        }
        putPrices(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/prices',
          headers: { 'Authorization': apiKey },
          method: 'POST',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  putPrice: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/prices/' + record._id,
        headers: { 'Authorization': apiKey },
        method: 'PUT',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  putPrices: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putPrices = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/prices',
              headers: { 'Authorization': apiKey },
              method: 'PUT',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putPrices(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Modified': recordLength })
          }
        }
        putPrices(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/prices',
          headers: { 'Authorization': apiKey },
          method: 'PUT',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  deletePrice: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/prices/' + id,
        headers: { 'Authorization': apiKey },
        method: 'DELETE'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  deletePrices: (ids, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/prices',
        headers: { 'Authorization': apiKey },
        method: 'DELETE',
        json: ids
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  getLog: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/logs/' + id,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  getLogs: (query, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/logs' + query,
        headers: { 'Authorization': apiKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  postLog: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/logs',
        headers: { 'Authorization': apiKey },
        method: 'POST',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  postLogs: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putLogs = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/logs',
              headers: { 'Authorization': apiKey },
              method: 'POST',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putLogs(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Created': recordLength })
          }
        }
        putLogs(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/logs',
          headers: { 'Authorization': apiKey },
          method: 'POST',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  putLog: (record, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/logs/' + record._id,
        headers: { 'Authorization': apiKey },
        method: 'PUT',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  putLogs: (records, apiKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putLogs = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/logs',
              headers: { 'Authorization': apiKey },
              method: 'PUT',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putLogs(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Modified': recordLength })
          }
        }
        putLogs(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/logs',
          headers: { 'Authorization': apiKey },
          method: 'PUT',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  deleteLog: (id, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/logs/' + id,
        headers: { 'Authorization': apiKey },
        method: 'DELETE'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  deleteLogs: (ids, apiKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/logs',
        headers: { 'Authorization': apiKey },
        method: 'DELETE',
        json: ids
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  getUser: (id, adminKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/users/' + id,
        headers: { 'Authorization': adminKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  getUsers: (query, adminKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/users' + query,
        headers: { 'Authorization': adminKey },
        method: 'GET'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  },
  postUser: (record, adminKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/users',
        headers: { 'Authorization': adminKey },
        method: 'POST',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  postUsers: (records, adminKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putUsers = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/users',
              headers: { 'Authorization': adminKey },
              method: 'POST',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putUsers(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Created': recordLength })
          }
        }
        putUsers(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/users',
          headers: { 'Authorization': adminKey },
          method: 'POST',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  putUser: (record, adminKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/users/' + record._id,
        headers: { 'Authorization': adminKey },
        method: 'PUT',
        json: record
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  putUsers: (records, adminKey) => {
    return new Promise((resolve, reject) => {
      var recordLength = records.length
      if (recordLength >= 100) {
        var count = Math.round(recordLength / 100)
        var putUsers = (i) => {
          if (i > 0) {
            request({
              url: 'https://api.convictional.com/users',
              headers: { 'Authorization': adminKey },
              method: 'PUT',
              json: records.splice(0, 100)
            }, (error, res, body) => {
              if (error) {
                reject(error)
              } else {
                setTimeout(() => {
                  putUsers(i - 1)
                }, 500)
              }
            })
          } else {
            resolve({ 'Modified': recordLength })
          }
        }
        putUsers(count + 1)
      } else {
        request({
          url: 'https://api.convictional.com/users',
          headers: { 'Authorization': adminKey },
          method: 'PUT',
          json: records
        }, (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            resolve(body)
          }
        })
      }
    })
  },
  deleteUser: (id, adminKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/users/' + id,
        headers: { 'Authorization': adminKey },
        method: 'DELETE'
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  },
  deleteUsers: (ids, adminKey) => {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.convictional.com/users',
        headers: { 'Authorization': adminKey },
        method: 'DELETE',
        json: ids
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  }
}
