import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './services/job.service';
import { JobController } from './controller/job.controller';
import { Job } from './job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobService],
  controllers: [JobController],
  exports: [TypeOrmModule],
})
export class JobModule {}
