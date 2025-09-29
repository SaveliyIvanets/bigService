const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const config = require("../../config.json");
const id = "68d28f8e403bcc90017daa63";
before(async function () {
  try {
    await mongoose.connect(config.mongodb.test_uri);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
});

after(async function () {
  await mongoose.connection.close();
});
it("create task", function (done) {
  const data = {
    title: "Test !!!",
    _id: id,
  };

  request(app)
    .post("/api/todos")
    .set("Content-Type", "application/json")
    .send(data)
    .expect(200)
    .expect(function (res) {
      console.log(res.body);
      if (res.body.status) {
        throw new Error(res.body.message);
      }
    })
    .end(done);
});

it("should get todo by id", function (done) {
  request(app)
    .get(`/api/todos/${id}`)
    .expect(200)
    .expect((res) => {
      console.log(res.body._id + " " + res.body.tittle);
      if (res.body._id !== id) {
        throw new Error("не тот айди");
      }
      if (res.body.title !== "Test !!!") {
        throw new Error("не то название");
      }
    })
    .end(function (err, res) {
      if (err) return done(err);
      console.log("Response:", res.body);
      done();
    });
});
it("get all tasks", function (done) {
  request(app)
    .get("/api/todos/")
    .expect(function (res) {
      if (res.body.status) {
        throw new Error(res.body.message);
      }
    })
    .expect(200)
    .end(done);
});

it("patch update", function (done) {
  request(app)
    .patch(`/api/todos/${id}`)
    .send({ title: "new title" })
    .expect(function (res) {
      if (res.body.status) {
        throw new Error(res.body.message);
      }
    })
    .expect(200)
    .end(done);
});
it("putch cheking", function (done) {
  request(app)
    .get(`/api/todos/${id}`)
    .expect(200)
    .expect((res) => {
      if (res.body._id !== id) {
        throw new Error("не тот айди");
      }
      if (res.body.title !== "new title") {
        throw new Error("не то название");
      }
    })
    .end(function (err, res) {
      if (err) return done(err);
      console.log("Response:", res.body);
      done();
    });
});
it("delete task", function (done) {
  request(app)
    .delete(`/api/todos/${id}`)
    .expect(function (res) {
      if (res.body.status) {
        throw new Error(res.body.message);
      }
    })
    .expect(200)
    .end(done);
});
