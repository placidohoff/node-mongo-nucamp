//All callbacks are defined externally as other parts of the program/code will make use of each of these modules which are exported.
//With no callback defined, the driver API will return a promise

exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection)
    return coll.insertOne(document)
}

//Lists all documents:
exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection)
    return coll.find().toArray()

}

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection)
    return coll.deleteOne(document)
}

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection)
    return coll.updateOne(document, { $set: update }, null)
}