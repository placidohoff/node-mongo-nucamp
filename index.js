//MongoDB Driver:
const MongoClient = require('mongodb').MongoClient
const assert = require('assert').strict

const url = 'mongodb://localhost:27017/'
const dbname = 'nucampsite'

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    //make sure there are no errors:
    //this tests if err === null. If true, proceed, false, there is an error and stop
    assert.strictEqual(err, null);

    console.log('Connected correctly to server')

    const db = client.db(dbname)

    //We delete all docs just so we have a clean slate each time for practice purposes:
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null)
        console.log('Dropped Collection', result)

        //Recreate the collection:
        const collection = db.collection('campsites')

        //Add a doc to the collection:
        collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" }, (err, result) => {
            assert.strictEqual(err, null)
            console.log('Insert Document:', result.ops)

            //Print all the docs in the collection:
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null)
                console.log('Found Documents:', docs)

                //Closes the client's connection to the MongoDB server
                client.close()
            })
        })
    })


})