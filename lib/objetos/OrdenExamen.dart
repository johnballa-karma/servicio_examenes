class OrdenExamen {
  final secuencial;
  final ordensecuencial;
  final examensecuencial;

  OrdenExamen({
    this.secuencial,
    required this.ordensecuencial,
    required this.examensecuencial,
  });

  factory OrdenExamen.fromJson(Map<String, dynamic> json) {
    return OrdenExamen(
      secuencial: json['secuencial'],
      ordensecuencial: json['ordensecuencial'],
      examensecuencial: json['examensecuencial'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'secuencial': secuencial,
      'ordensecuencial': ordensecuencial,
      'examensecuencial': examensecuencial,
    };
  }
}