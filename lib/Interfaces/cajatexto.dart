import 'package:flutter/material.dart';

class cajatexto extends StatelessWidget {
  final String value;
  final String labelText;
  final String? Function(String?)? validator;
  final void  Function(String?)? onGuardar;
  cajatexto({
    required this.value,
    required this.labelText,
    this.validator,
    this.onGuardar
  });



  @override
  Widget build(BuildContext context) {
    return TextFormField(
    initialValue: value,
    decoration: InputDecoration(labelText: labelText),
    validator: validator,
    onSaved: onGuardar
    );
  }

}