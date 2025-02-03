import 'dart:convert';
import 'package:app_examenes/objetos/OrdenExamen.dart';
import 'package:http/http.dart' as http;

class OrdenExamenService {
 final String _baseUrl = "http://172.16.41.69:3500/rest";

 Future<List<OrdenExamen>> getOrdenExamenes() async {
   final url = _baseUrl + "/ordenExamenes";
   final response = await http.get(Uri.parse(url));
   
   if (response.statusCode == 201) {
     final List<dynamic> data = json.decode(response.body);
     return data.map((json) => OrdenExamen.fromJson(json)).toList();
   } else {
     throw Exception('No se pudo recuperar orden examenes');
   }
 }

 Future<void> ingresarOrdenExamen(Map<String, dynamic> ordenExamen) async {
   final response = await http.post(
     Uri.parse(_baseUrl + "/ordenExamen"),
     headers: {"Content-type": "application/json"},
     body: jsonEncode(ordenExamen)
   );
   
   if (response.statusCode == 201) {
     print("Orden examen ingresado correctamente");
   } else {
     throw Exception('No se pudo ingresar orden examen');
   }
 }

 Future<void> modificarOrdenExamen(int secuencial, OrdenExamen ordenExamen) async {
   final response = await http.put(
     Uri.parse(_baseUrl + "/ordenExamen/$secuencial"),
     headers: {"Content-type": "application/json"},
     body: jsonEncode(ordenExamen.toJson())
   );
   
   if (response.statusCode == 201) {
     print("Orden examen modificado correctamente");
   } else {
     throw Exception('No se pudo modificar orden examen');
   }
 }

 Future<void> eliminarOrdenExamen(int secuencial) async {
   final response = await http.delete(
     Uri.parse(_baseUrl + "/ordenExamen/$secuencial")
   );
   
   if (response.statusCode == 201) {
     print("Orden examen eliminado correctamente");
   } else {
     throw Exception('No se pudo eliminar orden examen');
   }
 }

 Future<OrdenExamen> getOrdenExamenBySecuencial(int secuencial) async {
   final url = _baseUrl + "/ordenExamen/secuencial/$secuencial";
   final response = await http.get(Uri.parse(url));
   
   if (response.statusCode == 201) {
     final data = json.decode(response.body);
     return OrdenExamen.fromJson(data);
   } else {
     throw Exception('No se pudo recuperar el orden examen');
   }
 }
}