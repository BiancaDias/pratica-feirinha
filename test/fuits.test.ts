import supertest from "supertest"
import app from "../src/index"

const server = supertest(app)

describe("Testes no app", ()=>{
    it("should return 201 when inserting a fruit", async ()=>{
        const { status } = await server.post("/fruits").send({
                name: "Banana",
                price: 2
            })
        expect(status).toBe(201);
    })
    it("should return 409 when inserting a fruit that is already registered", async ()=>{
        const { status } = await server.post("/fruits").send({
                name: "Banana",
                price: 2
            })
        expect(status).toBe(409);
    })
    it("should return 422 when inserting a fruit with data missing", async ()=>{
        const { status } = await server.post("/fruits").send({
            })
        expect(status).toBe(422);
    })
    it("shoud return 404 when trying to get a fruit that doesn't exists", async ()=>{
        const { status } = await server.get("/fruits/6")
        expect(status).toBe(404);
    })
    it("should return 400 when id param is not valid", async ()=>{
        const { status } = await server.get("/fruits/-6")
        expect(status).toBe(400);
    })
    it("should return a fruit given an id", async ()=>{
        const { body } = await server.get("/fruits/1")
        expect(body).toEqual({
            id: 1,
            name: "Banana",
            price: 2
        });
    })
    it("should return a fruit given an id", async ()=>{
        const { body } = await server.get("/fruits")
        expect(body).toEqual([{
            id: 1,
            name: "Banana",
            price: 2
        }]);
    })
})