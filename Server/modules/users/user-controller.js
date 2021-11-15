let userDBHelper = require('./user-model')
let bcrypt = require('bcrypt')

module.exports.signUpWithDetails = (req, res) => {
    console.log("req.body")
    console.log(req.body)
    bcrypt.hash(req.body.password, 8, function (err, hash) {
        req.body.password = hash
        userDBHelper.createNewUser(req.body)
            .then(newCreatedUser => {
                console.log(newCreatedUser)
                req.session.user = newCreatedUser._id

                res.send({ status: true, created: true, newUser: newCreatedUser })

            })
            .catch(err => {
                res.send({ status: false, created: false, })
            })
    });


}

module.exports.signinWithEmailAndPassword = (req, res) => {
    userDBHelper.findSingleUserByQuery({ emailId: req.body.emailId })

        .then(user => {
            if (!user) {
                res.status(500).send({ status: false, found: false, emailId: false, })

                return
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {

                if (!result) {
                    console.log("password didnt math")
                    res.send({ status: false, errMessage: "The Password didnt match", auth: false })
                    return;
                }

                if (result) {
                    req.session.user = user._id
                    res.send({ status: true, created: true, signedInUser: user, auth: true })

                }

            })
        })

        .catch(err => {
            console.log("Unable to find user by id..!")
            console.log(err)

            res.send({ status: false, found: false, email: false, })
        })
}

module.exports.findMathingUser = (req, res) => {
    console.log("req.body.user")
    console.log(req.body)
    userDBHelper.findSingleUserByQuery({ emailId: req.body.user })
        .then(findedUser => {
            console.log(findedUser)
            res.send({ status: true, signedInUser: findedUser })
        })
        .catch(err => {
            console.log("err in findMathingUser = userController")
            res.send({ status: false })
        })

}

module.exports.updateUser = (req, res) => {
    let updates = {
        $set: {
            portfolio: {
                experience: req.body.experience,
                skills: req.body.skills
            }
        }
    }

    userDBHelper.updateUser({ _id: req.body.id }, updates)
        .then(updatedNewUser => {
            console.log(updatedNewUser)
            res.send({ status: true, updatedUser: updatedNewUser })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: false, message: "unable to updateUser", err: err })
        })
}

module.exports.getAllUsers = (req, res) => {
    userDBHelper.getAllUsers({})
        .then(result => {
            console.log(result)
            res.send({ status: true, users: result })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: false })
        })
}


module.exports.deleteThisUser = (req, res) => {
    userDBHelper.deleteThisUser({ _id: req.body.id })
        .then(result => {
            res.send({ status: true })
        })
        .catch(err => {
            res.send({ status: false })
        })
}
module.exports.adminFind = (req, res) => {
    userDBHelper.findSingleUserByQuery({ userType: 'admin' })
        .then(result => {
            console.log("user-admin")
            console.log(result)
            if (result) {
                res.send({ status: true })
                return
            }
            res.send({ status: false })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: false, msg: 'admin findind error' })
        })
}
module.exports.findStudents = (req, res) => {
    userDBHelper.getAllUsers({ userType: 'student' })
        .then(result => {
            console.log('find students')
            console.log(result)
            res.send({ status: true, data: result })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: false })
        })
}
module.exports.findCompanies = (req, res) => {
    userDBHelper.getAllUsers({ userType: 'company' })
    .then(result => {
        console.log('find company')
        console.log(result)
        res.send({ status: true, data: result })
    })
    .catch(err => {
        console.log(err)
        res.send({ status: false })
    })
 }



