import multer from 'multer';
import {Request} from 'express';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/restaurants')
    },
    filename: function (req, file, cb) {
      console.log(file)
      const ext = file.mimetype.split('/')[1];
      const restaurantId = req.params.restaurantId;
      cb(null, restaurantId + '_' + Date.now() + '.'+ext)
    }
  })

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    const fileExt = ['image/jpg', 'image/jpeg', 'image/png'];
    if (fileExt.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false)
    }
}

const uploadMiddleware = multer({fileFilter: fileFilter, storage: storage})

export default uploadMiddleware