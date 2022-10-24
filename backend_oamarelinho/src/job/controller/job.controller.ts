import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { JobService } from './../services/job.service';
import { Job } from '../job.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('job')
export class JobController {
  constructor(private JobService: JobService) {}
  
  @Get()
  async getAll(): Promise<Job[]> {
    return await this.JobService.getAll();
  }

  @Get(':id')
  async getOne(@Param() id: number): Promise<Job> {
    return await this.JobService.getOne(id);
  }
  @Get('/list-by-title/:limit/:title')
  async getGroupByTitle(@Param() params: string): Promise<string[]> {
    return await this.JobService.getGroupByTitle(params["title"],params["limit"]);
  }
  @Get('/list-by-cityname/:limit/:cityname')
  async getGroupByCityName(@Param() params: string): Promise<string[]> {
    return await this.JobService.getGroupByCityName(params["cityname"],params["limit"]);
  }
  @Get('/list-last-jobs/:limit')
  async getLastJobs(@Param() params: string): Promise<Job[]> {
    return await this.JobService.getLastJobs(params["limit"]);
  }
  @Post('/list-jobs')
  async getJobs(@Body() params: string): Promise<Job[]> {
    //let jobs =  new Array<Job>;
    // return jobs;
    let title = params["title"]?params["title"]:null;
    let cityName = params["cityName"]?params["cityName"]:null;
    return await this.JobService.getJobs(title,cityName);
  }
  @Post()
  async create(@Body() job: Job): Promise<Job> {
    return await this.JobService.create(job);
  }

  @Put(':id')
  async update(@Param() id: number, @Body() job: Job): Promise<UpdateResult> {
    return await this.JobService.update(id, job);
  }

  @Delete(':id')
  async delete(@Param() id: number): Promise<DeleteResult> {
    return await this.JobService.delete(id);
  }
}
