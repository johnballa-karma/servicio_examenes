import 'package:app_examenes/AuthService.dart';
import 'package:app_examenes/Interfaces/cajatexto.dart';
import 'package:flutter/material.dart';

class loginVentana extends StatefulWidget {
  const loginVentana({super.key});

  @override
  State<loginVentana> createState() => _loginVentanaState();
}

class _loginVentanaState extends State<loginVentana> {
  final Authservice _authService= Authservice();
  final TextEditingController _usernameController=TextEditingController();
  final TextEditingController _passwordController=TextEditingController();
  late bool _isLogin= false;
  void _login() async{
    setState(() {
      _isLogin= true;
    });
    final username= _usernameController.text;
    final password= _passwordController.text;
    final succes= await _authService.login(username, password);
    setState(() {
      _isLogin= true;
    });
    if (succes) {
      Navigator.pushReplacementNamed(context, '/menu');

    }else{
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Revise sus Credenciales")),
      );
    };
  }
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(labelText: 'Usuario')
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: 'Contraseña'),
              obscureText: true
            ),
            SizedBox(height: 20),
            _isLogin
              ?CircularProgressIndicator()
              :ElevatedButton(
                onPressed: _login, 
                child: Text('Iniciar Sesion'),
              )
          ],
        ),
      ),
    );
    
  }
}