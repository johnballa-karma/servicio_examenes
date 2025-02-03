import 'package:app_examenes/Services/PersonaService.dart';
import 'package:app_examenes/objetos/Persona.dart';
import 'package:flutter/material.dart';

class VentanaPersonaForm extends StatefulWidget {
  final Persona? persona;
  const VentanaPersonaForm({Key? key, this.persona});
  

  @override
  State<VentanaPersonaForm> createState() => _VentanaPersonaFormState();
}

class _VentanaPersonaFormState extends State<VentanaPersonaForm> {
  final _formKey = GlobalKey<FormState>();
  final PersonaService _personaService = PersonaService();
  late TextEditingController _cedulaController;
  late TextEditingController _nombreController;
  late TextEditingController _apellidoController;
  late TextEditingController _direccionController;
  late TextEditingController _telefonoController;
  late TextEditingController _correoController;
  @override
  void initState() {
    super.initState();
    _cedulaController = TextEditingController(text: widget.persona?.cedula??'');
    _nombreController = TextEditingController(text: widget.persona?.nombre??'');
    _apellidoController = TextEditingController(text: widget.persona?.apellido??'');
    _telefonoController = TextEditingController(text: widget.persona?.telefono??'');
    _correoController = TextEditingController(text: widget.persona?.correo??'');
    _direccionController = TextEditingController(text: widget.persona?.direccion??'');
  }
  Future<void> _guardarPersona()async{
    if (_formKey.currentState?.validate() ?? false) {
      final nuevaPersona = Persona(
        cedula: _cedulaController.text,
        nombre: _nombreController.text,
        apellido: _apellidoController.text,
        telefono: _telefonoController.text,
        correo: _correoController.text,
        direccion: _direccionController.text,
      );
      try{
        if(widget.persona==null){
          await _personaService.ingresarPersona(nuevaPersona);


        }else{
          await _personaService.modificarPersona(widget.persona!.cedula, nuevaPersona);

        }

      }catch(e){
        print("Error al guardar Persona: $e");
      }

    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.persona==null?"Agregar Persona":"Editar Persona"),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(false),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _cedulaController,
                decoration: InputDecoration(labelText:"Cedula" ),
                validator: (value) =>
                  value?.isEmpty ?? true? "Cedula Incorrecta": null,
              ),
              TextFormField(
                controller: _nombreController,
                decoration: InputDecoration(labelText:"Nombre" ),
                validator: (value) =>
                  value?.isEmpty ?? true? "Nombre Incorrecto": null,
              ),
              TextFormField(
                controller: _apellidoController,
                decoration: InputDecoration(labelText:"Apellido" ),
                validator: (value) =>
                  value?.isEmpty ?? true? "Apellido Incorrecto": null,
              ),
              TextFormField(
                controller: _direccionController,
                decoration: InputDecoration(labelText:"Direccion" ),
                validator: (value) =>
                  value?.isEmpty ?? true? "Direccion Incorrecta": null,
              ),
              TextFormField(
                controller: _telefonoController,
                decoration: InputDecoration(labelText:"Telefono" ),
                validator: (value) =>
                  value?.isEmpty ?? true? "Telefono Incorrecto": null,
              ),
              TextFormField(
                controller: _correoController,
                decoration: InputDecoration(labelText:"Correo" ),
                validator: (value) =>
                  value?.isEmpty ?? true? "Correo Incorrecto": null,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _guardarPersona,
                child: Text("Guardar")
              )
            ],
          ),
        ),
      ),
    );
  }
}