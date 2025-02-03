import 'package:app_examenes/TokenService.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';


class Menuprincipal extends StatefulWidget {
  const Menuprincipal({super.key});

  @override
  State<Menuprincipal> createState() => _MenuprincipalState();
}

class _MenuprincipalState extends State<Menuprincipal> {
  final Tokenservice _tokenService=Tokenservice();
  String tokenExpiryInfo="";
  @override
  

  Future<void> _loadTokenInfo() async{
    final prefs= await SharedPreferences.getInstance();
    final token=prefs.getString('token');
    if(token!=null){
      final expiryInfo=_tokenService.getTokenExpirty('token');
      setState(() {
        tokenExpiryInfo=expiryInfo;
      });

    }else{
      setState(() {
        tokenExpiryInfo="No token found";
      });
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Menu Principal'),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Text(
              tokenExpiryInfo,
              style: TextStyle(color: Colors.white, fontSize: 14),
            ),
          )
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            DrawerHeader(
              child: Text("Menu Principal"),

            ),
            ListTile(
              title: Text('Persona'),
              onTap: () {
                Navigator.pushNamed(context, "/persona");
              },
            ),
             ListTile(
              title: Text('Ingresar Orden'),
              onTap: () {
                Navigator.pushNamed(context, "/ordenform");
              },
            ),
            ListTile(
              title: Text('Cerrar Sesión'),
              onTap: () {
                Navigator.pushNamed(context, "/");
              },
            )
          ],
        ),
      ),
      body: Text("Bienvenido al sistema de Examenes"),
    );
  }
}