import 'dart:convert';
import 'package:app_examenes/objetos/Examen.dart';
import 'package:http/http.dart' as http;

class ExamenService {
  final String _baseUrl = "http://172.16.41.69:3500/rest";

  List<Examen> _examenes = [];
  Future<List<Examen>> getExamenes() async{
    final url=_baseUrl+"/examenes";
    final response= await http.get(Uri.parse(url));
    if(response.statusCode==201){
      final List<dynamic> responseData = jsonDecode(response.body)['data'];
     try {
        _examenes=responseData.map((data) => Examen.fromJson(data)).toList();
      } catch (e) {
        print(e);
      }
      return _examenes;
    }else{
      throw Exception('No pudo recuperar personas');
    }
  }

  Future<void> ingresarExamen(Examen examen) async {
    final response = await http.post(
      Uri.parse(_baseUrl + "/examen"),
      headers: {"Content-type": "application/json"},
      body: jsonEncode(examen.toJson())
    );
    
    if (response.statusCode == 201) {
      print("Examen ingresado correctamente");
    } else {
      throw Exception('No se pudo ingresar examen');
    }
  }

  Future<void> modificarExamen(int secuencial, Examen examen) async {
    final response = await http.put(
      Uri.parse(_baseUrl + "/examen/$secuencial"),
      headers: {"Content-type": "application/json"},
      body: jsonEncode(examen.toJson())
    );
    
    if (response.statusCode == 201) {
      print("Examen modificado correctamente");
    } else {
      throw Exception('No se pudo modificar examen');
    }
  }

  Future<void> eliminarExamen(int secuencial) async {
    final response = await http.delete(
      Uri.parse(_baseUrl + "/examen/$secuencial")
    );
    
    if (response.statusCode == 201) {
      print("Examen eliminado correctamente");
    } else {
      throw Exception('No se pudo eliminar examen');
    }
  }

  Future<Examen> getExamenBySecuencial(int secuencial) async {
    final url = _baseUrl + "/examen/secuencial/$secuencial";
    final response = await http.get(Uri.parse(url));
    
    if (response.statusCode == 201) {
      final data = json.decode(response.body);
      return Examen.fromJson(data);
    } else {
      throw Exception('No se pudo recuperar el examen');
    }
  }
}