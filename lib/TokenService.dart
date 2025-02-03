import 'package:jwt_decoder/jwt_decoder.dart';
class Tokenservice {
  String getTokenExpirty(String token){
    try{
      final decoded=JwtDecoder.decode(token);
      final expiryDate= JwtDecoder.getExpirationDate(token);
      final remainingTime = expiryDate.difference(DateTime.now());
      if(remainingTime. isNegative){
        return "Token experid";
      }else{
        return "Expies in: ${remainingTime.inMinutes}minutos";
      }
    }catch(e){
      return "Token invalido";
    }
  }
}