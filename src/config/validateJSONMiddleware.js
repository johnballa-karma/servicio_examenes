import apiResponse from "../components/apiResponse.js";

function validateJSONMiddleware(req, res, next) {
  if (req.is("application/json")) {
    next(); // Permite que la solicitud continúe
  } else {
    const response = new apiResponse(
      false,
      null,
      400,
      "Tipo de contenido de solicitud incorrecto. Se requiere application/json."
    );
    res.status(400).json(response);
  }
}

export default validateJSONMiddleware;
