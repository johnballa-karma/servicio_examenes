class Persona {
  final String cedula;
  final String nombre;
  final String apellido;
  final String direccion;
  final String telefono;
  final String correo;
  Persona({
    required this.cedula,
    required this.nombre,
    required this.apellido,
    required this.direccion,
    required this.telefono,
    required this.correo,
  });
  factory Persona.fromJson(Map<String, dynamic> json){
    return Persona(
      cedula: json ['cedula'],
      nombre: json ['nombre'],
      apellido: json ['apellido'],
      direccion: json ['direccion'],
      telefono: json ['telefono'],
      correo: json  ['correo'],
    );
  }
  Map<String, dynamic> toJson(){
    return {
      'cedula': cedula,
      'nombre': nombre,
      'apellido': apellido,
      'direccion': direccion,
      'telefono': telefono,
      'correo': correo,
    };
  }
}