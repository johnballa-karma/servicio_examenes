import 'package:app_examenes/AuthService.dart';
import 'package:app_examenes/Interfaces/VentanaOrdenForm.dart';
import 'package:app_examenes/Interfaces/VentanaPersonaList.dart';
import 'package:app_examenes/Interfaces/loginVentana.dart';
import 'package:app_examenes/Interfaces/menuprincipal.dart';
import 'package:flutter/material.dart';

void main() {
  runApp( MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});
  final Authservice _authservice= Authservice();
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login Examenes',
      initialRoute: '/',
      routes: {
        '/': (context) => FutureBuilder<String?>(
          future: _authservice.getToken(), 
          builder: (context,hasDate){
            if(hasDate.connectionState==ConnectionState.waiting){
              return CircularProgressIndicator();
            }else if (hasDate.hasData){
              return Menuprincipal();
            }else{
              return loginVentana();
            }
          }
        ),
        '/': (context)=>loginVentana(),
        '/menu':(context) => Menuprincipal(),
        '/persona':(context) => VentanaPersonaList(),
         '/ordenform':(context) => OrdenForm(),
      },

    );
  }
  
}
