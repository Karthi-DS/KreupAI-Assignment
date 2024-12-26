const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db')

const examGradesRoutes = require('./routes/examGradesRoutes');
const reportCardsRoutes = require('./routes/reportCardsRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const cors = require("cors")
const app = express();
app.use(bodyParser.json());


sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync failed:', err));

app.use(cors({origin:"*"}))

app.use('/api', examGradesRoutes);
app.use('/api', reportCardsRoutes);
app.use('/api', studentRoutes);
app.use('/api',subjectRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome Developer!' });
});
app.listen(4000, () => {
    console.log('Server running on port 4000');
});