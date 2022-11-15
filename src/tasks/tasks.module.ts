import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TasksRepository} from "./tasks.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
        TasksRepository
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
