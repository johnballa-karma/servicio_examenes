import 'dart:convert';
import 'package:app_examenes/objetos/Orden.dart';
import 'package:http/http.dart' as http;

class OrdenService {
  final String _baseUrl = "http://172.16.41.69:3500/rest";

  Future<List<Orden>> getOrdenes() async {
    final url = _baseUrl + "/ordenes";
    final response = await http.get(Uri.parse(url));
    
    if (response.statusCode == 201) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Orden.fromJson(json)).toList();
    } else {
      throw Exception('No se pudo recuperar ordenes');
    }
  }

  Future<String> ingrearOrden(Map<String, dynamic> orden)async{
    final response= await http.post(
      Uri.parse(_baseUrl+"/orden"),
      headers: {"Content-type":"application/json"},
      body:json.encode(orden) 
    );
    if(response.statusCode==201){
      final Orden responseData = jsonDecode(response.body)['data'];
      return responseData.secuencial.toString();
    }else{
      throw Exception("Fallo el ingreso de orden");
    }
  }

  Future<void> modificarOrden(int secuencial, Orden orden) async {
    final response = await http.put(
      Uri.parse(_baseUrl + "/orden/$secuencial"),
      headers: {"Content-type": "application/json"},
      body: jsonEncode(orden.toJson())
    );
    
    if (response.statusCode == 201) {
      print("Orden modificada correctamente");
    } else {
      throw Exception('No se pudo modificar orden');
    }
  }

  Future<void> eliminarOrden(int secuencial) async {
    final response = await http.delete(
      Uri.parse(_baseUrl + "/orden/$secuencial")
    );
    
    if (response.statusCode == 201) {
      print("Orden eliminada correctamente");
    } else {
      throw Exception('No se pudo eliminar orden');
    }
  }

  Future<Orden> getOrdenBySecuencial(int secuencial) async {
    final url = _baseUrl + "/orden/secuencial/$secuencial";
    final response = await http.get(Uri.parse(url));
    
    if (response.statusCode == 201) {
      final data = json.decode(response.body);
      return Orden.fromJson(data);
    } else {
      throw Exception('No se pudo recuperar la orden');
    }
  }
}