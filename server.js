require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();

app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const FormData = mongoose.model('FormData', formDataSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const formData = new FormData({ name, email, message });
    
    formData.save()
      .then(() => {
        res.status(200).json({ message: 'Form data saved successfully' });
    })
    .catch(error => {
        res.status(500).json({ error: 'An error occurred while saving form data' });
    });
});



app.listen(5000,()=>{
    console.log('Server listening on port 5000');
})