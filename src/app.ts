import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config()

import loginRoute from './routes/loginRoute'

const app = express();
app.use(express.json());

app.use('/v1/api', loginRoute)


app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port ${process.env.PORT || 3000}`)
})