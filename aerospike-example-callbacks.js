const Aerospike = require('aerospike')
const Key = Aerospike.Key

function assertOk (error, message) {
  if (error) {
    console.error('ERROR - %s: %s [%s]\n%s', message, error.message, error.code, error.stack)
    throw error
  }
}

Aerospike.connect(function (error, client) {
  assertOk(error, 'Connecting to Aerospike cluster')

  var key = new Key('test', 'demo', 'test1')
  client.put(key, {name: 'Bob', age: 49}, function (error) {
    assertOk(error, 'Writing database record')

    client.get(key, function (error, record) {
      assertOk(error, 'Reading database record')

      console.info(record) // => { name: 'Bob', age: 49 }

      client.close()
    })
  })
})