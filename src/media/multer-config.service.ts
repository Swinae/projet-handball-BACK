import { BadRequestException } from "@nestjs/common";
import { MulterOptionsFactory } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import * as path from "path";



export class MulterConfigService implements MulterOptionsFactory {

    getStorage() {
        return diskStorage({
            destination: './upload',
            filename: function (_req, file, cb) {
                const ext = path.extname(file.originalname)
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, uniqueSuffix + ext)
            },
        })
    }

    fileFilter(_req: any, file, cb: Function) {
     
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
    }

    createMulterOptions(): MulterOptions | Promise<MulterOptions> {
        return {
            storage: this.getStorage(),
            fileFilter: this.fileFilter
        }
    }

}