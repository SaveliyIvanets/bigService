const repository = require("./repository");
const mongoose = require("mongoose");
class mongoRepository extends repository {
  constructor(model) {
    super();
    this.model = model;
  }
  async findById(id) {
    const error = new Error();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      error.name = "FindError";
      error.message = "Invalid record ID";
      error.status = 400;
      throw error;
    }
    const record = await this.model.findById(id);
    if (!record) {
      error.name = "NotFoundError";
      error.message = "Record not found";
      error.status = 404;
      throw error;
    }
    return record;
  }
  async create(record) {
    await record.save();
  }
  async delete(id) {
    const error = new Error();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      error.name = "DeleteError";
      error.message = "Invalid record ID";
      error.status = 400;
      throw error;
    }
    const deletedRecord = await this.model.findByIdAndDelete(id);
    if (!deletedRecord) {
      error.name = "NotFoundError";
      error.message = "Record not found";
      error.status = 404;
      throw error;
    }
  }
  async update(id, record) {
    const error = new Error();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      error.name = "UpdateError";
      error.message = "Invalid record ID";
      error.status = 400;
      throw error;
    }
    const newRecord = await this.model.findByIdAndUpdate(id, record, {
      new: true,
      runValidators: true,
    });
    if (!newRecord) {
      error.name = "NotFoundError";
      error.message = "Record not found";
      error.status = 404;
      throw error;
    }
  }
  async findAll(filtr, limit, offset, sortValue, sorted) {
    const records = await this.model
      .find(filtr)
      .skip(offset)
      .limit(limit)
      .sort(sorted ? { [sortValue]: -1 } : {});
    return records;
  }
}
module.exports = mongoRepository;
