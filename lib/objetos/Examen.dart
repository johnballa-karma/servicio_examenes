class Examen {
  final secuencial;
  final descripcion;
  final indicacion;
  final costo;

  Examen({
    this.secuencial,
    required this.descripcion,
    required this.indicacion,
    required this.costo,
  });

  factory Examen.fromJson(Map<String, dynamic> json) {
    return Examen(
      secuencial: json['secuencial'],
      descripcion: json['descripcion'],
      indicacion: json['indicacion'],
      costo: json['costo'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'secuencial': secuencial,
      'descripcion': descripcion,
      'indicacion': indicacion,
      'costo': costo,
    };
  }
}