import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Authservice {
  static const String baseUrl="http://172.16.41.69:4500/rest";
  Future<bool> login(String username, String password)async{
    final url =Uri.parse("$baseUrl/auth");
    final response = await http.post(
      url,
      headers:{'Content-Type' :'application/json'},
      body: jsonEncode({'username':username,'password':password}),
    );
    if(response.statusCode==200){
      final data=jsonDecode(response.body);
      final token =data['data']['token'];
      if(token!= null){
        await _saveToken(token);
        return true;
      }
    }
    return false;
  }
  Future<void> _saveToken(String token)async{
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
  }
  Future<String?> getToken() async{
    final prefs = await SharedPreferences.getInstance();
    await prefs.getString('token');
  }
  Future<void> cerrarSesion() async{
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
  }
  
}