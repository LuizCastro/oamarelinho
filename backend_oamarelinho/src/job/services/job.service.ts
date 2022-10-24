import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { strict } from 'assert';
import { empty } from 'rxjs';
import { Repository, UpdateResult, DeleteResult, Like } from 'typeorm';
import { Job } from '../job.entity';

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private JobRepository: Repository<Job>) {}
  async create(job: Job): Promise<Job> {
    return await this.JobRepository.save(job);
  }
  async update(id: number, job: Job): Promise<UpdateResult> {
    return await this.JobRepository.update(id, job);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.JobRepository.delete(id);
  }
  async getAll(): Promise<Job[]> {
    return await this.JobRepository.orderBy('updatedAt', 'DESC')
    .orderBy('createdAt', 'DESC').find();
  }
  async getOne(id: number): Promise<Job> {
    return await this.JobRepository.findOne({ where: { id: id } });
  }
  async getGroupByTitle(title: string, limit: number): Promise<string[]> {
    let dataarray=[];
    let data = await this.JobRepository.createQueryBuilder()
      .select(['title'])
      .where("title like :title", { title: `${title}%` })
      .groupBy('title')
      .orderBy('title', 'ASC')
      .limit(limit)
      .getRawMany().then(function (response) {
        response.forEach(async (element) => {
            dataarray.push(element["title"].toUpperCase());
        });
      });
    return dataarray;
  }

  async getGroupByCityName(cityName: string, limit: number): Promise<string[]> {
    let dataarray=[];
    let data =  await this.JobRepository.createQueryBuilder()
      .select(['cityName'])
      .where("cityName like :cityName", { cityName: `${cityName}%` })
      .groupBy('cityName')
      .orderBy('cityName', 'ASC')
      .limit(limit)
      .getRawMany()
      .then(function (response) {
        response.forEach(async (element) => {
            dataarray.push(element["cityName"].toUpperCase());
        });
      });
      return dataarray;
  }
  async getLastJobs(limit: number): Promise<Job[]> {
    return await this.JobRepository.createQueryBuilder()
      .orderBy('createdAt', 'DESC')
      .limit(limit)
      .getRawMany();
  }
  async getJobs(title: string, cityName: string): Promise<Job[]> {
    this.JobRepository.createQueryBuilder('PRAGMA encoding="UTF-8";');
    let query = this.JobRepository.createQueryBuilder();
    if(title){
        query = query.where("upper(title) like :title", { title: `${title.toLocaleUpperCase()}%` });
    }
    if(cityName && title){
        query = query.andWhere("upper(cityName) like :cityName", { cityName: `${cityName.toLocaleUpperCase()}%` });
    }else if(cityName){
        query = query.where("upper(cityName) like :cityName", { cityName: `${cityName.toLocaleUpperCase()}%` });
    }
    return await query
    .orderBy('updatedAt', 'DESC')
    .orderBy('createdAt', 'DESC')
    .getRawMany();
  }

  
}
