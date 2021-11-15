const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName: String,
    userType: String,
    emailId: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now },
    portfolio: {
        experience: String,
        skills: String
    }

})

const UserModel = new mongoose.model('users', userSchema)


module.exports.createNewUser = (userParameters) => {
    return new Promise((resolve, reject) => {
        let userInstance = new UserModel(userParameters)
        userInstance.save((err, newUser) => {
            if (err) {
                console.log("Unalbe To Create New User In DB...!")
                console.log(err)
                return reject(err)
            }
            resolve(newUser)
        })
    })
}

module.exports.findSingleUserByQuery = (query) => {
    console.log("signin")
    console.log(query)
    return UserModel.findOne(query)
}

module.exports.updateUser = (query, updates) => {
    return new Promise((resolve, reject) => {
        console.log("query")
        console.log(query)
        console.log("updates")
        console.log(updates)

        UserModel.updateOne(query, updates, (err, updatedUser) => {
            if (updatedUser) {
                console.log("updatedUser")
                console.log(updatedUser)
                resolve(updatedUser)
            } else {
                console.log("err")
                console.log(err)
                reject(err)
            }
        })

    })
}

module.exports.getAllUsers = (query) => {
    return UserModel.find(query)
}

module.exports.deleteThisUser = (query) => {
    return UserModel.deleteOne(query)
}





