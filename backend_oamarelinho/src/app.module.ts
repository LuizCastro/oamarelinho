import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job/job.entity';

@Module({
  imports: [
    JobModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'oamarelinhoDB.sql',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
