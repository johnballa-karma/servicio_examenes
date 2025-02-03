import 'package:app_examenes/Interfaces/VentanaPersonForm.dart';
import 'package:app_examenes/Services/PersonaService.dart';
import 'package:app_examenes/objetos/Persona.dart';
import 'package:flutter/material.dart';

class VentanaPersonaList extends StatefulWidget {
  const VentanaPersonaList({super.key});

  @override
  State<VentanaPersonaList> createState() => _VentanaPersonaListState();
}

class _VentanaPersonaListState extends State<VentanaPersonaList> {
  final PersonaService _personaService=PersonaService();
  List<Persona> _personas=[];
  bool _isLoading=true;
  @override
  void initState() {
    super.initState();
    _cargarPersonas();
  }
  Future<void> _cargarPersonas()async{
    try {
      final personas= await _personaService.getPersonas();
      _personas=personas;
      _isLoading=false;
    } catch (e) {
      print("Error al cargar personas $e");
    }
  }
  Future<void> _eliminarPersona(String cedula)async{
    try {
      await _personaService.eliminarPersona(cedula);
      _cargarPersonas();
    } catch (e) {
      print("No se pudo eliminar la persona $e");
    }
  }
  Future<void> _navegarToPersonaForm(Persona? persona) async{
    final result= await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => VentanaPersonaForm(persona: persona) ,
      )
    );
    if(result==true){
      _cargarPersonas();
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Listar Personas"),
      ),
      body: _isLoading
          ?Center(child: CircularProgressIndicator())
          :ListView.builder(
            itemBuilder: (context, index){
              final persona= _personas[index];
              return ListTile(
                title: Text("${persona.nombre} ${persona.apellido}"),
                subtitle: Text("${persona.cedula}"),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      onPressed:() => _navegarToPersonaForm(persona), 
                      icon: Icon(Icons.edit, color: Colors.blue)
                    ),
                    IconButton(
                      onPressed:() =>_eliminarPersona(persona.cedula),
                      icon:Icon(Icons.delete, color: Colors.blue)
                    )
                  ],
                ),
              );
            },
          ),
          floatingActionButton: FloatingActionButton(
            onPressed: ()=> _navegarToPersonaForm(null),
            child: Icon(Icons.add,color: Colors.blue,),
          ),
    );
  }
}