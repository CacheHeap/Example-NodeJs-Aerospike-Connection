const Aerospike = require('aerospike')

Aerospike.connect()
  .then(client => {
    let key = new Aerospike.Key('test', 'test', 'abcd')
    let bins = {
      name: 'Norma',
      age: 31
    }

    return client.put(key, bins)
      .then(() => client.get(key))
      .then(record => console.info('Record:', record))
      .then(() => client.remove(key))
      .then(() => client.close())
      .catch(error => {
        client.close()
        throw error
      })
  })
  .catch(error => {
    console.error('Error:', error)
    process.exit(1)
  })