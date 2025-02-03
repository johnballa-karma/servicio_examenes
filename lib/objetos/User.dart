class User {
 final secuencial;
 final username;
 final email;
 final nombres;
 final apellidos;
 final cedula;
 final direccion;
 final movil;
 final titulo_principal;
 final password;
 final estaActivo;
 final cargo;
 final tipoUsuarioSecuencial;

 User({
   this.secuencial,
   required this.username,
   required this.email, 
   required this.nombres,
   required this.apellidos,
   required this.cedula,
   required this.direccion,
   required this.movil,
   required this.titulo_principal,
   required this.password,
   required this.estaActivo,
   required this.cargo,
   required this.tipoUsuarioSecuencial,
 });

 factory User.fromJson(Map<String, dynamic> json) {
   return User(
     secuencial: json['secuencial'],
     username: json['username'],
     email: json['email'],
     nombres: json['nombres'],
     apellidos: json['apellidos'], 
     cedula: json['cedula'],
     direccion: json['direccion'],
     movil: json['movil'],
     titulo_principal: json['titulo_principal'],
     password: json['password'],
     estaActivo: json['estaActivo'],
     cargo: json['cargo'],
     tipoUsuarioSecuencial: json['tipoUsuarioSecuencial'],
   );
 }

 Map<String, dynamic> toJson() {
   return {
     'secuencial': secuencial,
     'username': username,
     'email': email,
     'nombres': nombres,
     'apellidos': apellidos,
     'cedula': cedula,
     'direccion': direccion, 
     'movil': movil,
     'titulo_principal': titulo_principal,
     'password': password,
     'estaActivo': estaActivo,
     'cargo': cargo,
     'tipoUsuarioSecuencial': tipoUsuarioSecuencial,
   };
 }
}