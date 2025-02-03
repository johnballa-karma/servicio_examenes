
import 'package:app_examenes/Services/ExamenService.dart';
import 'package:app_examenes/Services/OrdenExamenService.dart';
import 'package:app_examenes/Services/OrdenService.dart';
import 'package:app_examenes/Services/PersonaService.dart';
import 'package:app_examenes/objetos/Examen.dart';
import 'package:app_examenes/objetos/Persona.dart';
import 'package:flutter/material.dart';

class OrdenForm extends StatefulWidget {
  @override
  _OrdenFormState createState() => _OrdenFormState();
}

class _OrdenFormState extends State<OrdenForm> {
  final TextEditingController cedulaController = TextEditingController();
  final TextEditingController fechaController = TextEditingController();
  List<Examen> _examenes = [];
  List<Map<String, dynamic>> ordenExamen = [];
  Persona? _persona;
  dynamic selectExamen;
  PersonaService _personaService=PersonaService();
  ExamenService _examenService=ExamenService();
  OrdenService _ordenService=OrdenService();
  OrdenExamenService _ordenExamenService=OrdenExamenService();

  Future<void> buscarPersona() async {
    final cedula = cedulaController.text;
    try {
      // Reemplaza con tu URL de API
      final persona= await _personaService.getByPersonasCedula(cedula);
      setState(() {
        _persona = persona;
      });
    } catch (e) {
      showErrorDialog('Error al consultar la persona');
    }
  }

  Future<void> buscarExamenes() async {
    try {
      // Reemplaza con tu URL de 
      final examenes = await _examenService.getExamenes();
      setState(() {
        _examenes = examenes;
      });
    } catch (e) {
      showErrorDialog('Error al cargar los exámenes');
    }
  }

  void agregarExamen() {
    if (selectExamen == null) {
      showErrorDialog('Por favor selecciona un examen.');
      return;
    }
    // Validar si el examen ya fue agregado
    final existe = ordenExamen.any(
      (examen) => examen['examensecuencial'] == selectExamen.secuencial,
    );
    if (existe) {
      showErrorDialog('El examen ya ha sido agregado.');
      return;
    }
    // Agregar el examen a la lista
    setState(() {
      ordenExamen.add({
        'examensecuencial': selectExamen.secuencial,
        'nombre': selectExamen.descripcion,
      });
      selectExamen = null;
    });
  }

  void eliminarExamen(int secuencial) {
    setState(() {
      ordenExamen.removeWhere((examen) => examen['examensecuencial'] == secuencial);
    });
  }

  Future<void> guardarOrden() async {
    final fecha = fechaController.text;
    final cedula = cedulaController.text;

    try {
      // Guardar orden principal
      final Map<String, dynamic> orden = {
        'fecha': fecha,
        'cedulaPersona': cedula,
      };
      final secuencialOrden = await _ordenService.ingrearOrden(orden);
      // Guardar los exámenes relacionados
      for (var examen in ordenExamen) {
        final Map<String, dynamic> ordenesExamenes= {
          'ordensecuencial': secuencialOrden,
          'examensecuencial': examen['examensecuencial'],
        };
        _ordenExamenService.ingresarOrdenExamen(ordenesExamenes);
      }

      // Resetear formulario
      setState(() {
        cedulaController.clear();
        fechaController.clear();
        _persona = null;
        ordenExamen.clear();
        selectExamen = null;
      });

      showSuccessDialog('Orden guardada con éxito');
    } catch (e) {
      showErrorDialog('Error al guardar la orden');
    }
  }

  Future<Map<String, dynamic>> fetchApi(String endpoint) async {
    final response = await Future.delayed(
      Duration(seconds: 2),
      () => {
        // Simulación de respuesta
        'data': [],
      },
    );
    return response;
  }

  Future<void> postApi(String endpoint, Map<String, dynamic> body) async {
    // Implementación de POST
  }

  void showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text('Error'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('Cerrar'),
          ),
        ],
      ),
    );
  }

  void showSuccessDialog(String message) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text('Éxito'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('Cerrar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Orden de Exámenes'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: cedulaController,
              decoration: InputDecoration(
                labelText: 'Cédula',
              ),
            ),
            ElevatedButton(
              onPressed: buscarPersona,
              child: Text('Buscar Persona'),
            ),
            if (_persona != null) ...[
              Text('Nombres: ${_persona?.nombre} ${_persona?.apellido}'),
              Text('Dirección: ${_persona?.direccion}'),
            ],
            TextField(
              controller: fechaController,
              decoration: InputDecoration(
                labelText: 'Fecha de Orden',
              ),
              keyboardType: TextInputType.datetime,
            ),
            ElevatedButton(
              onPressed: buscarExamenes,
              child: Text('Cargar Exámenes'),
            ),
            DropdownButton<dynamic>(
              value: selectExamen,
              onChanged: (value) {
                setState(() {
                  selectExamen = value;
                });
              },
              items: _examenes
                  .map<DropdownMenuItem<dynamic>>((examen) =>
                      DropdownMenuItem(value: examen, child: Text(examen.descripcion)))
                  .toList(),
              hint: Text('Seleccionar Examen'),
            ),
            ElevatedButton(
              onPressed: agregarExamen,
              child: Text('Agregar Examen'),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: ordenExamen.length,
                itemBuilder: (_, index) {
                  final examen = ordenExamen[index];
                  return ListTile(
                    title: Text(examen['nombre']),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () => eliminarExamen(examen['examensecuencial']),
                    ),
                  );
                },
              ),
            ),
            ElevatedButton(
              onPressed: guardarOrden,
              child: Text('Guardar Orden'),
            ),
          ],
        ),
      ),
    );
  }
}