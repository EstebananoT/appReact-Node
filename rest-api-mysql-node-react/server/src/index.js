const express = require('express');
const app = express();
const cors = require('cors');
// Settings
app.set('port',process.env.PORT|| 3001 );

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(require('./routes/admin'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});