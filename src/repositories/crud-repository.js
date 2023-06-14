const { Logger } = require("../config");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {

  constructor(model) {
    this.model = model;
  }

  async create(data) {
    // try {
    const response = await this.model.create(data);
    return response;
    // } catch (error) {
    //   Logger.error("Something went wrong from CRUD Repo : create");
    //   throw error;
    // }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      if (!response) {
        throw new AppError(
          "Not able to find the resource",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
      Logger.error("Something went wrong from CRUD Repo : destroy");
      throw error;
    }
  }

  /**
   * @param {primary key Id} data
   */
  async get(id) {
    try {
      const response = await this.model.findByPk(id);
      console.log(response);
      if (!response) {
        throw new AppError(
          "Not able to find the resource",
          StatusCodes.BAD_REQUEST
        );
      }
      return response;
    } catch (error) {
      Logger.error("Something went wrong from CRUD Repo : get");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong from CRUD Repo : getAll");
      throw error;
    }
  }

  async update(id, data) {
    //data is object {col: value}
    try {
      const response = await this.model.update(data, {
        where: { id: id },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong from CRUD Repo : update");
      throw error;
    }
  }

  /**
   * async update(data, id) {
     const response = await this.model.update(data, { where: { id: id } });
     return response;
    }
   */
}

module.exports = { CrudRepository };
