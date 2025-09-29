const repository = require("./repository");
class postgresRepository extends repository {
  constructor(model) {
    super();
    this.model = model;
  }
  async findById(id) {
    const error = new Error();
    const record = await this.model.findByPk(id);
    if (!record) {
      error.name = "NotFoundError";
      error.message = "Record not found";
      error.status = 404;
      throw error;
    }
    return record;
  }
  async create(record) {
    await this.model.create(record);
  }
  async delete(id) {
    const error = new Error();
    const deletedRecord = await this.model.destroy({
      where: {
        id: id,
      },
    });
    if (!deletedRecord) {
      error.name = "NotFoundError";
      error.message = "Record not found";
      error.status = 404;
      throw error;
    }
  }
  async update(id, record) {
    const error = new Error();
    const newRecord = this.model.update(record, {
      where: {
        id: id,
      },
    });
    if (!newRecord) {
      error.name = "NotFoundError";
      error.message = "Record not found";
      error.status = 404;
      throw error;
    }
  }
  async findAll(filtr, limit, offset, sortValue, sorted) {
    const records = await this.model.findAll({
      where: filtr,
      offset: offset,
      limit: limit,
      order: sorted ? [[sortValue, "DESC"]] : [],
    });
    return records;
  }
}
module.exports = postgresRepository;
