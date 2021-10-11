import fs from "fs"
import multer from "multer";

const fileMiddleware = () => {
    return (req, res, next) => {

        const upload = multer({ dest: "./uploads/" });

        if (req.user && req.user.role === roleName) {
            next();
        } else {
            next("restricted");
        }
    };
}

export {
    fileMiddleware
}