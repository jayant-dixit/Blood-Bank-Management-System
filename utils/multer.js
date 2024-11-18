import multer from 'multer'
import crypro from 'crypto'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/Records')
  },
  filename: function (req, file, cb) {
    const fn = crypro.randomBytes(12).toString('hex') + path.extname(file.originalname)
    cb(null, fn)
  }
})

const upload = multer({ storage: storage })

export default upload