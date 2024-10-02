import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventMock, eventListMock, eventMock, prismaMock } from '../../test/utils/mock';
import { Event } from '@prisma/client';

describe('EventService', () => {
  let eventService: EventService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: PrismaService,
          useValue: prismaMock
        }
      ]
    }).compile()

    eventService = await module.get(EventService)

    prismaMock.event.findMany.mockClear()
    prismaMock.event.findUnique.mockClear()
    prismaMock.event.create.mockClear()
    prismaMock.event.update.mockClear()
    prismaMock.event.delete.mockClear()
  } )

  describe('When the findOne methode is called', () => {
    describe('And the findOne methode returns the event', () => {
      let event: Event;
      beforeEach(() => {
        event = eventMock
        prismaMock.event.findUnique.mockResolvedValue(event)
      })

      it('Should return the event', async () => {
        const result = await eventService.findOne(event.id)
        
        // On vérifie que le resultat de findOne avec event.id retourne bien l'objet event correspondant
        expect(result).toBe(event)

        // On vérifie que la méthode findUnique n'a été appelée qu'une seule fois => limite les erreurs si quelqu'un cherche à modifier la fonction dans event.service
        expect(prismaMock.event.findUnique).toHaveBeenCalledTimes(1)

        // On vérifie que la méthode a bien été appelé avec l'id de l'event (n'a pas été forcé par exemple where: id: 3 ou avec d'autres critères)
        expect(prismaMock.event.findUnique).toHaveBeenCalledWith({where: {id: event.id}})
      })

      it('Should return null if event id doesn\'t exist', async () => {
        prismaMock.event.findUnique.mockResolvedValue(null)
        const result= await eventService.findOne(0)
        expect(result).toBe(null)
      })
    })
  })

  describe('When the findAll methode is called', () => {
    describe('And the findAll methode returns every event', () => {
      let event: Event[];
      beforeEach(() => {
        event = eventListMock
        prismaMock.event.findMany.mockResolvedValue(event)
      })

      it('Should return the event list', async () => {
        const result = await eventService.findAll()
        
        expect(result).toBe(event)

        expect(prismaMock.event.findMany).toHaveBeenCalledTimes(1)
      })

    })
  })

  describe('When the create methode is called', () => {
    describe('And the create function returns the created event', () => {
      it('Should return the event', async () => {
        const event = eventMock
        prismaMock.event.create.mockResolvedValue(event)
        const result = await eventService.create(CreateEventMock, CreateEventMock.creator_id)
        expect(result).toBe(eventMock)
        expect(prismaMock.event.create).toHaveBeenCalledTimes(1)
        expect(prismaMock.event.create).toHaveBeenCalledWith({data: CreateEventMock})
      })

      it('Should return {} if event data is null', async () => {
        prismaMock.event.create.mockResolvedValue({})
        const result = await eventService.create(null, null)
        expect(result).toStrictEqual({})
        expect(prismaMock.event.create).toHaveBeenCalledTimes(1)
        expect(prismaMock.event.create).toHaveBeenCalledWith({data: {
          creator_id: null
        }})
      })
    })
  })
});
