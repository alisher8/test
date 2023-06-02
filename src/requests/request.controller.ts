import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Delete,
    Query,
  } from '@nestjs/common';
  import { CreateRequestDto } from './dto/create-request.dto';
  import { UpdateRequestDto } from './dto/update-request.dto';
  import { RequestsService } from './request.service';
  
  @Controller('requests')
  export class RequestsController {
    constructor(private readonly requestsService: RequestsService) {}
  
    @Get()
    async findAll(
    @Query('column') column: string,
    @Query('value') value: string,
    ) {
      return this.requestsService.findAll(column, value);
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.requestsService.findOneById(id);
    }
  
    @Post()
    async create(@Body() createRequestDto: CreateRequestDto) {
      return this.requestsService.create(createRequestDto);
    }
  
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateRequestDto: UpdateRequestDto,
    ) {
      return this.requestsService.updateById(id, updateRequestDto);
    }
  
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
     this.requestsService.deleteById(id);
    }
  }
  