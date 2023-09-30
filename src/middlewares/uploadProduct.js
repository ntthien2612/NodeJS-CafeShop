import util from "util";
import multer from "multer";
import path from 'path';
import { constan} from "../const/constan"
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + constan.UPLOADFILE);
    },
    filename: (req, file, cb) => {
        let filename = Date.now() + '-' + file.originalname
        cb(null, filename);
    },
});


const imageFilter = function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif') {
        return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
};
const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: imageFilter
}).single("img");

const uploadFileMiddleware = util.promisify(uploadFile);


export { uploadFileMiddleware };