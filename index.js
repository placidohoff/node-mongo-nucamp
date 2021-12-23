//MongoDB Driver:
const MongoClient = require('mongodb').MongoClient
const dbOper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'nucampsite'

//Refactored into a promise chain. Each DB operation is done sequentially via promise reslove().then()
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {

        console.log('Connected correctly to server')

        const db = client.db(dbname)

        //We delete all docs just so we have a clean slate each time for practice purposes:
        db.dropCollection('campsites')
            .then(result => {
                console.log('Dropped Collection', result)
            })
            .catch(err => console.log("No collection to drop."))

        //Add a doc to the collection:
        dbOper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
            .then(result => {
                // assert.strictEqual(err, null)
                console.log('Insert Document:', result.ops)

                return dbOper.findDocuments(db, 'campsites')
            })
            .then(docs => {
                console.log('Found Documents:', docs)

                return dbOper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description" }, 'campsites')
            })
            .then(result => {
                console.log('Updated Document Count:', result.result.nModified)

                return dbOper.findDocuments(db, 'campsites')
            })
            .then(docs => {
                console.log('Found Documents:', docs)

                return dbOper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites')
            })
            .then(result => {
                console.log('Deleted Document Count:', result.deletedCount)

                return client.close()
            })
            .catch(err => {
                console.log(err)
                client.close()
            })
    })
    .catch(err => console.log(err))
