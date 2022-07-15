const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const userName = process.argv[3]
const userNumber = process.argv[4]

// const url = `mongodb+srv://blakeahalt:${password}@cluster0.nrpgtan.mongodb.net/?retryWrites=true&w=majority`

const url = `mongodb+srv://blakeahalt:${password}@cluster0.nrpgtan.mongodb.net/Person?retryWrites=true&w=majority`

// const uri = "mongodb+srv://blakeadmin:Dbpassword@cluster0.nrpgtan.mongodb.net/?retryWrites=true&w=majority"

const userSchema = new mongoose.Schema({
	id: {
    type: String
  },
  name: {
    type: String,
    minLength: [3, 'Minimum allowed name length is 3'],
    required: true
	   },
  number: {
    type: String,
    minLength: [8, 'Please include at least 8 digits'],
    required: true,
    validate: {
      validator: function(v) {
        return /^\s*\d{2,3}-\d{7,8}\s*$/.test(v)
      },
      message: '12-1234567 or 12-12345678 or 123-123-4567 or 123-123-4567 are acceptable'
    }
	   }
})

const User = mongoose.model('User', userSchema)

if (process.argv.length === 3) {
  mongoose.connect(url)
  User.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(user => {
	  console.log(`${user.name} ${user.number}`)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length === 4) {
  console.log('Please provide a telephone number')
  process.exit(2)
}


else if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(result => {
      console.log('connected')
      const user = new User({
        name: process.argv[3],
        number: process.argv[4],
      })
      return user.save()
    })
    .then(() => {
      console.log(`added ${userName} number: ${userNumber} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}