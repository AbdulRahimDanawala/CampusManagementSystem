const mongoose = require('mongoose')

const applySchema = mongoose.Schema({
    studentEmail: String,
    studentSkills: String,
    studentExperience: String,
    jobId: String,
    companyEmail: String,
    companyName: String,
    companyRequirement: {
        skills: String,
        experience: String
    },
    createdAt: { type: Date, default: Date.now },
})

const CompanyModel = new mongoose.model('applyJob', applySchema)

module.exports.createNewAppliedJob = (query) => {
    return new Promise((resolve, reject) => {
        let applyInstance = new CompanyModel(query)
        applyInstance.save((err, appliedJob) => {
            if (err) {
                console.log("Unalbe To Create New applied Job In DB...!")
                console.log(err)
                return reject(err)
            }
            resolve(appliedJob)
        })
    })
}

module.exports.getAllAppliedJobs = (query) => {
    return CompanyModel.find(query)
}

module.exports.undoThisJob = (query) => {
    return CompanyModel.deleteOne(query)
}


module.exports.deleteCandidate = (query) => {
    return CompanyModel.deleteMany(query)
}

module.exports.findCandidate = (query) => {
    return CompanyModel.find(query)
 }
