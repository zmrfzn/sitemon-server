import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import mainRoutes from './app/routes/main.routes'

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('PING!!');
});

app.use('/api', mainRoutes);

app.listen(port, () => {
   return console.log(`server is listening on ${port}`);
});