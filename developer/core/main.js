class DataDefault {
  constructor({ config, data, queryResponse, details }) {
    this.config = config;
    this.data = data;
    this.queryResponse = queryResponse;
    this.details = details;

    this.params = {
      data: data,
      config: config,
      queryResponse: queryResponse,
      details: details,
    };
  }
}

module.exports = DataDefault;
