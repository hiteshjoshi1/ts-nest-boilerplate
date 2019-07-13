import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../guards/role.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<Photo> {
    return this.photoService.findOne(id);
  }
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() photo: Photo) {
    return await this.photoService.save(photo);
  }
}
