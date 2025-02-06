class apiResponse {
    constructor(success, data, httpStatus, message) {
      this.success = success;
      this.data = data;
      this.httpStatus = httpStatus;
      this.message = message;
    }
  }
  
export default apiResponse;
