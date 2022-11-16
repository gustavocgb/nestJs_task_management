import {Test} from '@nestjs/testing'
import {TasksService} from "./tasks.service";
import {TasksRepository} from "./tasks.repository";
import {User} from "../auth/user.entity";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {NotFoundException} from "@nestjs/common";

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
});

const mockUser: User = {
    id: 'id_user',
    username: 'User_1',
    password: 'password',
    tasks: []
}

const mockTask: Task = {
    id: 'id_task',
    user: mockUser,
    description: 'test',
    title: 'test',
    status: TaskStatus.OPEN
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository }
            ]
        }).compile()

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository)
    })

    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {
            // expect(tasksRepository.getTasks).not.toHaveBeenCalled();
            // used method 'mockResolvedValue' because 'getTasks' return a promise
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            // expect(tasksRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        })
    })

    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result', async () => {
            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('id_task', mockUser);
            expect(result).toEqual(mockTask);
        })

        it('calls TaskRepository.findOne and handles an error', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('id_task', mockUser)).rejects.toThrow(NotFoundException);
        })
    })
})