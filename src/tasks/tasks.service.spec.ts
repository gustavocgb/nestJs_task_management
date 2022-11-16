import { Test } from '@nestjs/testing'
import {TasksService} from "./tasks.service";
import {TasksRepository} from "./tasks.repository";

const mockTasksRepository = () => ({
    getTasks: jest.fn()
});

const mockUser = {
    id: 'id_1',
    username: 'User_1',
    password: 'password',
    tasks: []
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
})
