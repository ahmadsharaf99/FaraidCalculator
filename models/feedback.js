const mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.set('debug', true);

mongoose
  .connect('mongodb://localhost/faraidapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.log('Not Connected to Database ERROR! ', err);
  });

const feedbackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    message: {
        type: String,
        required: true
    }
});

let Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;