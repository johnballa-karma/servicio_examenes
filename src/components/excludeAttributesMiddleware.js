export default (excludeAttributes) => {
  return (req, res, next) => {
    // Obtén el cuerpo de la solicitud (request body)
    const requestBody = req.body;

    // Excluye los atributos especificados de requestBody
    if (requestBody) {
      excludeAttributes.forEach((attribute) => {
        delete requestBody[attribute];
      });
    }

    // Continúa con el siguiente middleware (en este caso, el controlador)
    next();
  };
};
