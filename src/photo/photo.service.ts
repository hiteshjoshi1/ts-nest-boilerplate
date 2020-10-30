import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { ConfigService } from "../config/config.service";

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    private readonly configService: ConfigService,
  ) {}

  test(): string {
    return this.configService.config.FABRIC_NETWORK.ORGANIZATION;
  }
  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async save(photo: Photo): Promise<Photo> {
    return await this.photoRepository.save(photo);
  }

  async findOne(id: number): Promise<Photo> {
    return await this.photoRepository.findOne(id);
  }
}
