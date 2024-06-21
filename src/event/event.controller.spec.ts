import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { JwtService } from '@nestjs/jwt';
import { eventMock, requestMock } from '../../test/utils/mock';


describe('EventController', () => {
  let eventController: EventController;

  const mockEventService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [{
        provide: EventService,
        useValue: mockEventService
      }, JwtService]
    }).compile()

    eventController = module.get<EventController>(EventController)

  })

  it('Should be defined', () => {
    expect(eventController).toBeDefined()
  })

  describe('When the findOne function is called', () => { 
    it('findOne => should find an event and return its data', async () => {
    const event = eventMock
    
    jest.spyOn(mockEventService, 'findOne').mockReturnValue(event)
    
    const result = await eventController.findOne(event.id.toString())
    expect(result).toBe(event)
    expect(mockEventService.findOne).toHaveBeenCalledTimes(1)
    expect(mockEventService.findOne).toHaveBeenCalledWith(event.id)
  }) 
})
  

  describe('When the create function is called', () => {
    it('Should return the created event', async () => {
      const event = eventMock
      const request = requestMock
      jest.spyOn(mockEventService, 'create').mockReturnValue(event)
      
      const result = await eventController.create(event, request)
      expect(result).toBe(event)
      expect(mockEventService.create).toHaveBeenCalledTimes(1)
      expect(mockEventService.create).toHaveBeenCalledWith(event, request.user.sub)
    })
  })
});
