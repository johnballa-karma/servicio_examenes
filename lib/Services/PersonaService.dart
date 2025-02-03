import 'dart:convert';
import 'package:app_examenes/objetos/Persona.dart';
import 'package:http/http.dart' as http;

class PersonaService{
  final String _baseUrl= "http://172.16.41.69:4500/rest";
  Future<List<Persona>> getPersonas() async{
    final url=_baseUrl+"/personas";
    final response=await http.get(Uri.parse(url));
    if (response.statusCode==201){
      final List<dynamic> responseData= jsonDecode(response.body)['data'];
      return responseData.map((data) => Persona.fromJson(data)).toList();
    }
    else{
      throw Exception('No se pudo recuperar personas');
    }
  }
  Future<void> ingresarPersona(Persona persona)async{
    final response= await http.post(
      Uri.parse(_baseUrl+"/persona"),
      headers: {"Content-type":"application/json"},
      body: jsonEncode(persona.toJson())
    );
    if (response.statusCode==201){
      print("Persona ingresada correctamente");
    }else{
      throw Exception('No se pudo ingresar persona');
    }
  }
  Future<void> modificarPersona(String cedula, Persona persona)async{
      final response= await http.put(
        Uri.parse(_baseUrl+"/persona/cedula/$cedula"),
        headers: {"Content-type":"application/json"},
        body: jsonEncode(persona.toJson())
      );
      if (response.statusCode==201){
        print("Persona modificada correctamente");

      }else{
      throw Exception('No se pudo modificar persona');
    }
   }
   Future<void> eliminarPersona(String cedula)async{
      final response= await http.delete(Uri.parse(_baseUrl+"/persona/cedula/$cedula"));
      if (response.statusCode==200){
      }else{
        throw Exception('No se pudo eliminar persona');
      }
    }
    Future<Persona> getByPersonasCedula(String cedula) async {
    final url = "$_baseUrl/persona/cedula/$cedula";
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 201) { // Verifica código 200
      final Map<String, dynamic> responseData = jsonDecode(response.body);
      // Asegúrate de que 'data' sea un objeto y no una lista
      final personaData = responseData['data'];
      if (personaData != null) {
        return Persona.fromJson(personaData);
      } else {
        throw Exception('No se encontró una persona con la cédula proporcionada.');
      }
    } else {
      throw Exception('Error al recuperar la persona. Código: ${response.statusCode}');
    }
  }
}