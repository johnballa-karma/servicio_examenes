import bcrypt from "bcryptjs";
class EncriptService {
  static async hashPassword(plainPassword) {
    const saltRounds = 10; // Número de rondas de hashing (ajusta según tus necesidades)

    try {
      // Genera un salt aleatorio
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash y salting de la contraseña
      const hash = await bcrypt.hash(plainPassword, salt);

      return hash;
    } catch (err) {
      // Maneja el error de forma apropiada (puede lanzar una excepción o devolver un valor de error)
      throw err;
    }
  }

  // Función para verificar la contraseña ingresada por el usuario
  static async checkPassword(plainPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (err) {
      // Maneja el error de forma apropiada (puede lanzar una excepción o devolver un valor de error)
      throw err;
    }
  }
}

// Función de inicio de sesión
async function login(username, password) {
  // Obtén los datos del usuario por su nombre de usuario (asumimos que existe una función getUserByUserName)
  const user = await getUserByUserName(username);

  if (!user) {
    // El usuario no existe
    return "Usuario no encontrado";
  }

  // Verifica la contraseña ingresada con el hash almacenado en la base de datos
  const isPasswordMatch = await checkPassword(password, user.hashedPassword);

  if (isPasswordMatch) {
    // La contraseña coincide, el usuario está autenticado
    return "Inicio de sesión exitoso";
  } else {
    // La contraseña no coincide
    return "Contraseña incorrecta";
  }
}

// Ejemplo de uso de la función de inicio de sesión
async function main() {
  const username = "nombreDeUsuario";
  const password = "contraseñaDelUsuario";

  const result = await login(username, password);
  
}

export default EncriptService;
