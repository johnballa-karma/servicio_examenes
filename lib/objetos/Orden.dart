class Orden {
  final secuencial;
  final fecha;
  final cedulaPersona;

  Orden({
    this.secuencial,
    required this.fecha,
    required this.cedulaPersona,
  });

  factory Orden.fromJson(Map<String, dynamic> json) {
    return Orden(
      secuencial: json['secuencial'],
      fecha: json['fecha'],
      cedulaPersona: json['cedulaPersona'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'secuencial': secuencial,
      'fecha': fecha,
      'cedulaPersona': cedulaPersona,
    };
  }
}