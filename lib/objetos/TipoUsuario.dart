class TipoUsuario {
 final secuencial;
 final descripcion;
 final estaActivo;

 TipoUsuario({
   this.secuencial,
   required this.descripcion,
   required this.estaActivo,
 });

 factory TipoUsuario.fromJson(Map<String, dynamic> json) {
   return TipoUsuario(
     secuencial: json['secuencial'],
     descripcion: json['descripcion'],
     estaActivo: json['estaActivo'],
   );
 }

 Map<String, dynamic> toJson() {
   return {
     'secuencial': secuencial,
     'descripcion': descripcion,
     'estaActivo': estaActivo,
   };
 }
}