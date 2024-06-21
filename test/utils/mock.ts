import { Event } from "@prisma/client"
import { customRequest } from "src/utils/Interfaces/CustomRequest"

export const prismaMock = {
    event: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

export const eventMock: Event = {
    id: 1,
    type: "MATCH",
    title: "Match de league",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    adress: "Winterfell",
    img: "test",
    start_time: new Date(),
    end_time: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    creator_id: 1,
    match_id: 1
}

export const eventListMock: Event[] = [
    {
        id: 2,
        type: "ENTRAINEMENT",
        title: "Entraînement du mardi",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        adress: "Winterfell",
        img: "test",
        start_time: new Date(),
        end_time: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        creator_id: 2,
        match_id: 2
    },
    {
        id: 3,
        type: "APERO",
        title: "Apéro du vendredi",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        adress: "Winterfell",
        img: "test",
        start_time: new Date(),
        end_time: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        creator_id: 3,
        match_id: 3
    }
]

export const CreateEventMock: Event = {
    id: 1,
    type: "MATCH",
    title: "Match de league",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    adress: "Winterfell",
    img: "test",
    start_time: new Date(),
    end_time: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    creator_id: 1,
    match_id: 1
}

export const requestMock: customRequest = {
    user: {
        sub: 1,
        role: "ADMIN",
        refreshToken: "refreshTokenMock"
    },
    cache: "default",
    credentials: "omit",
    destination: "",
    headers: undefined,
    integrity: "",
    keepalive: false,
    method: "",
    mode: "same-origin",
    redirect: "error",
    referrer: "",
    referrerPolicy: "",
    signal: undefined,
    url: "",
    clone: function (): Request {
        throw new Error("Function not implemented.")
    },
    body: undefined,
    bodyUsed: false,
    arrayBuffer: function (): Promise<ArrayBuffer> {
        throw new Error("Function not implemented.")
    },
    blob: function (): Promise<Blob> {
        throw new Error("Function not implemented.")
    },
    formData: function (): Promise<FormData> {
        throw new Error("Function not implemented.")
    },
    json: function (): Promise<any> {
        throw new Error("Function not implemented.")
    },
    text: function (): Promise<string> {
        throw new Error("Function not implemented.")
    }
}