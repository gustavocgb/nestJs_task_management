import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

}
