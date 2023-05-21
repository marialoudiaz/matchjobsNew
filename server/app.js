const express = require('express');
const app= express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5555
  // check schemas or give error
  mongoose.set('debug', true);
  require('dotenv').config();
  
  app.use(express.urlencoded({extended:true}))
  app.use(express.json())
  app.use(require('cors')())



// DB CONNECT
  async function connecting(){
try {
  await mongoose.connect(process.env.MONGO)
  console.log('Connected to the database')
} catch (error) {
  console.log('ERROR : Seems like your DB is not running')
}
}


app.use('/recruiter/', require('./routes/recruitersRoutes'));
app.use('/applicant/', require('./routes/applicantsRoutes'));
app.use('/admin/', require('./routes/adminRoutes'));


const path = require('path');
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

connecting().then(() => {
  app.listen(PORT, () => {
      console.log(`listening for requests in ${PORT}`);
  })
})


