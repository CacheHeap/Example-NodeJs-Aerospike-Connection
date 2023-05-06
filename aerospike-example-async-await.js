const Aerospike = require('aerospike');

(async function () {
  let client
  try {
    client = await Aerospike.connect()
    let key = new Aerospike.Key('test', 'test', 'abcd')
    let bins = {
      name: 'Norma',
      age: 31
    }

    await client.put(key, bins)
    let record = await client.get(key)
    console.info('Record:', record)
    await client.remove(key)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  } finally {
    if (client) client.close()
  }
})()