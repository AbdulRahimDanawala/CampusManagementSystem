let companyDBHelper = require('./company-model')
let applyJobDBHelper = require('./applyJob')
let sendMail = require('./nodeMailer')


module.exports.saveNewJob = (req, res) => {
    console.log(req.body)
    companyDBHelper.createNewJob(req.body)
        .then(createdJob => {
            console.log("New Job Successfully Created ")
            res.send({ status: true, newJob: createdJob })
        })
        .catch(err => {
            console.log("unable to create job")
            res.send({ status: false })
        })
}

module.exports.getAllJobs = (req, res) => {
    companyDBHelper.findJobs({})
        .then(findedJobs => {
            console.log("jobs finded succesfully..")
            res.send({ status: true, allJobs: findedJobs })
        })
        .catch(err => {
            console.log("unable to finding jobs")
        })
}

module.exports.findJob = (req, res) => {
    console.log(req.body.value)
    companyDBHelper.findJobs({ companyName: req.body.value })
        .then(result => {
            console.log(result)
            res.send({ status: true, findedJobs: result })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: false })
        })

}
module.exports.findJobsByEmail = (req, res) => {
    console.log("req.body")
    console.log(req.body)
    companyDBHelper.findJobs({ companyEmail: req.body.user })
        .then(result => {
            console.log("jobs find successfully by email")
            console.log(result)
            res.send({ status: true, findedJobs: result })
        })
        .catch(err => {
            console.log("unable to find jobs by email")
            console.log(err)
            res.send({ status: false })
        })

}
module.exports.applyJob = (req, res) => {
    console.log(req.body)
    applyJobDBHelper.createNewAppliedJob(req.body)
        .then(result => {
            console.log('result')
            console.log(result)
            res.send({ status: true })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: false })
        })
}

module.exports.appliedJobs = (req, res) => {
    console.log('appliedJobs')
    console.log(req.body)
    applyJobDBHelper.getAllAppliedJobs({ studentEmail: req.body.userId })
        .then(result => {
            console.log(result)
            res.send({ status: true, appliedJobs: result })
        })
        .catch(err => {
            console.log('err')
            console.log(err)
            res.send({ status: false })
        })
}
module.exports.undoThisJob = (req, res) => {
    console.log(req.body)
    applyJobDBHelper.undoThisJob({ jobId: req.body.id, studentEmail: req.body.userId })
        .then(result => {
            res.send({ status: true })
        })
        .catch(err => {
            console.log('unable to undo this job')
            console.log(err)
            res.send({ status: false })
        })
}
module.exports.deleteThisJob = (req, res) => {
    console.log(req.body)
    applyJobDBHelper.undoThisJob({ _id: req.body.id })
        .then(result => {
            console.log(result)
            res.send({ status: true })
        })
        .catch(err => {
            console.log('unable to delete this job')
            console.log(err)
            res.send({ status: false })
        })
}
module.exports.deleteThisJobById = (req, res) => {
    console.log(req.body)
    companyDBHelper.deleteThisJob({ _id: req.body.id })
        .then(result => {
            console.log(result)
            res.send({ status: true })
        })
        .catch(err => {
            console.log('unable to delete this job')
            console.log(err)
            res.send({ status: false })
        })
}
module.exports.deleteCandidate = (req, res) => {
    applyJobDBHelper.deleteCandidate({ jobId: req.body.id })
        .then(res => {
            console.log("candidate deleted successfully")
            console.log(res)
            res.send({ status: true })
        })
        .catch(err => {
            console.log("unable to delete candidate")
            console.log(err)
            res.send({ status: false })

        })
}

module.exports.findCandidate = (req, res) => {
    applyJobDBHelper.findCandidate({ jobId: req.body.id })
        .then(result => {
            console.log(result)
            res.send({ status: true, findedCandidate: result })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: false })
        })
}

module.exports.candidatDelete = (req, res) => {
    console.log("admin Route")
    console.log(req.body.email)
    applyJobDBHelper.deleteCandidate({ studentEmail: req.body.email })
        .then(result => {
            console.log("candidate deleted successfully")
            console.log(result)
            res.send({ status: true })
        })
        .catch(err => {
            console.log("unable to delete candidate")
            console.log(err)
            res.send({ status: false })

        })
}

module.exports.deleteAllJobByEmail = (req, res) => {
    companyDBHelper.deleteAllJobs({ companyEmail: req.body.email })
        .then(result => {
            console.log('delete all jobs by email')
            console.log(result)
            res.send({ status: true })
        })
        .catch(err => {
            console.log('unable to delete all jobs by email')
            console.log(err)
            res.send({ status: false })
        })
}
module.exports.approvePost = (req, res) => {

    sendMail.approveRequest()
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}