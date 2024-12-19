const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db')

const examGradesRoutes = require('./routes/examGradesRoutes');
const reportCardsRoutes = require('./routes/reportCardsRoutes');

const app = express();
app.use(bodyParser.json());


sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync failed:', err));


app.use('/api', examGradesRoutes);
app.use('/api', reportCardsRoutes);
app.get('/', (req, res) => {
    console.log("hi")
    res.status(200).json({ message: 'Welcome Developer!' });
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});