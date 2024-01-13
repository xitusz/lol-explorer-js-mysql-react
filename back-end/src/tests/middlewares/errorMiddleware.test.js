/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const errorMiddleware = require("../../middlewares/errorMiddleware");

describe("Error Middleware", () => {
  it("should handle error", () => {
    const err = {
      statusCode: 404,
      message: "Not Found",
    };
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.spy();

    errorMiddleware(err, req, res, next);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: "Not Found" })).to.be.true;
    expect(next.notCalled).to.be.true;
  });
});
