import 'dart:convert';
import 'package:app_examenes/objetos/User.dart';
import 'package:http/http.dart' as http;

class UserService {
 final String _baseUrl = "http://172.16.41.69:3500/rest";

 Future<List<User>> getUsuarios() async {
   final url = _baseUrl + "/usuarios";
   final response = await http.get(Uri.parse(url));
   
   if (response.statusCode == 200) {
     final List<dynamic> data = json.decode(response.body);
     return data.map((json) => User.fromJson(json)).toList();
   } else {
     throw Exception('No se pudo recuperar usuarios');
   }
 }

 Future<List<User>> getUsuariosDesactivos() async {
   final url = _baseUrl + "/usuariosdesactivos";
   final response = await http.get(Uri.parse(url));
   
   if (response.statusCode == 200) {
     final List<dynamic> data = json.decode(response.body);
     return data.map((json) => User.fromJson(json)).toList();
   } else {
     throw Exception('No se pudo recuperar usuarios desactivos');
   }
 }

 Future<void> ingresarUser(User user) async {
   final response = await http.post(
     Uri.parse(_baseUrl + "/users"),
     headers: {"Content-type": "application/json"},
     body: jsonEncode(user.toJson())
   );
   
   if (response.statusCode == 201) {
     print("Usuario ingresado correctamente");
   } else {
     throw Exception('No se pudo ingresar usuario');
   }
 }

 Future<void> modificarUser(int secuencial, User user) async {
   final response = await http.put(
     Uri.parse(_baseUrl + "/users/$secuencial"),
     headers: {"Content-type": "application/json"},
     body: jsonEncode(user.toJson())
   );
   
   if (response.statusCode == 200) {
     print("Usuario modificado correctamente");
   } else {
     throw Exception('No se pudo modificar usuario');
   }
 }

 Future<void> eliminarUser(int secuencial) async {
   final response = await http.delete(
     Uri.parse(_baseUrl + "/users/$secuencial")
   );
   
   if (response.statusCode == 204) {
     print("Usuario eliminado correctamente");
   } else {
     throw Exception('No se pudo eliminar usuario');
   }
 }

 Future<User> getUserByCedula(String cedula) async {
   final url = _baseUrl + "/users/cedula/$cedula";
   final response = await http.get(Uri.parse(url));
   
   if (response.statusCode == 200) {
     final data = json.decode(response.body);
     return User.fromJson(data);
   } else {
     throw Exception('No se pudo recuperar el usuario por cédula');
   }
 }

 Future<User> getUserByUsername(String username) async {
   final url = _baseUrl + "/users/username/$username";
   final response = await http.get(Uri.parse(url));
   
   if (response.statusCode == 200) {
     final data = json.decode(response.body);
     return User.fromJson(data);
   } else {
     throw Exception('No se pudo recuperar el usuario por username');
   }
 }

 Future<User> getUserBySecuencial(int secuencial) async {
   final url = _baseUrl + "/users/secuencial/$secuencial";
   final response = await http.get(Uri.parse(url));
   
   if (response.statusCode == 200) {
     final data = json.decode(response.body);
     return User.fromJson(data);
   } else {
     throw Exception('No se pudo recuperar el usuario por secuencial');
   }
 }
}