const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    companyName: String,
    companyEmail: String,
    skills: String,
    experience: String,
    createdAt: { type: Date, default: Date.now },

})

const CompanyModel = new mongoose.model('companyJob', companySchema)

module.exports.createNewJob = (query) => {

    return new Promise((resolve, reject) => {
        let companyInstance = new CompanyModel(query)
        companyInstance.save((err, newJob) => {
            if (err) {
                console.log("unable to create new job!")
                console.log(err)
                reject(err)
                return
            }
            resolve(newJob)
        })
    })
}

module.exports.findJobs = (query) => {
    console.log(query)
    JSON.stringify(query)
    console.log(query)
    return new Promise((resolve, reject) => {
        CompanyModel.find(query, (err, doc) => {
            if (err) {
                console.log('Error in finding jobs from db')
                console.log(err)
                return reject(err)
            }
            resolve(doc)
        })
    })
}


module.exports.deleteThisJob = (query) => {
    return CompanyModel.deleteOne(query)
}

module.exports.deleteAllJobs = (query) => {
 return CompanyModel.deleteMany(query)
}

