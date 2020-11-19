import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv'
dotenv.config()

import connectDb from './db'
import loginRoute from './routes/loginRoute'
import bookingRoute from './routes/bookingRoute';
import restaurantRoute from './routes/restaurantRoute';
import reviewRoute from './routes/reviewRoute';
import errorMiddleWare from './middleware/errorMiddleware';


const app = express();
app.use(express.json());
app.use(express.static('public'))

app.use('/v1/api', loginRoute);
app.use('/v1/api/booking', bookingRoute);
app.use('/v1/api/restaurant', restaurantRoute);
app.use('/v1/api/reviews', reviewRoute);

app.use('/', (req, res) => {
  res.status(404);
  res.json({
    error: 'Page not found'
  })
})

app.use(errorMiddleWare);

app.listen(process.env.PORT || 3001, () => {
  connectDb()
  console.log(`server started on port ${process.env.PORT || 3001}`)
})