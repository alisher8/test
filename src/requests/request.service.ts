import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestEntity } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    const newRequest = this.requestRepository.create({ ...createRequestDto });
    const savedRequest = await this.requestRepository.save(newRequest);
    return savedRequest;
  }

  async findOneById(id: number) {
    const foundRequest = await this.requestRepository.findOneBy({ id });
    if (!foundRequest) {
      throw new NotFoundException('Заявка не найдена');
    }
    return foundRequest;
  }

  async findOneByEmail(email: string) {
    const foundRequest = await this.requestRepository.findOneBy({ email });
    if (!foundRequest) {
      throw new NotFoundException('Заявка не найдена');
    }
    return foundRequest;
  }

  async findAll(column: string, value: string) {
    if (!column || !value) {
    return this.requestRepository.find();
    }
    return this.requestRepository.find({ where: { [column]: Equal(value) } });
  }

  async updateById(id: number, updateRequestDto: UpdateRequestDto) {
    const foundRequest = await this.findOneById(id);
    if (!updateRequestDto.comment) {
        throw new BadRequestException('Комментарий не должен быть пустым');
      }
    foundRequest.status = 'Resolved';
    const savedRequest = await this.requestRepository.save({
      ...foundRequest,
      ...updateRequestDto,
    });
    return savedRequest;
  }

  async deleteById(id: number) {
    const foundRequest = await this.requestRepository.findOneBy({ id });
    if (!foundRequest) {
      throw new NotFoundException('Заявка не найдена');
    }
    await this.requestRepository.delete(id);
  }
}
