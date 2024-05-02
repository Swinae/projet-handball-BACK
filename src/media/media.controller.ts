import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }




  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() payload: any,
    @UploadedFile() file: Express.Multer.File) {
    console.log("🚀 ~ MediaController ~ payload:", payload)
    console.log("🚀 ~ MediaController ~ @UploadedFile ~ file:", file)

    // Ex.: avatar user
    // Appeler userService pour mettre à jour le champ avatar avec le nom du fichier
    switch (payload.type) {
      case 'user_avatar':  // Appeler userService pour mettre à jour le champ avatar avec le nom du fichier
      case 'event':  // Appeler eventService pour mettre à jour le champ avatar avec le nom du fichier
    }

    return 'ok'
  }
}
