import nodemailer from "nodemailer";
import {
  CLAVE,
  CORREO,
  CLAVE1,
  CORREO1,
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../config.js";
const mail = {
  user: CORREO,
  pass: CLAVE,
};
const mail1 = {
  user: CORREO1,
  pass: CLAVE1,
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: mail,
});
const transporter1 = nodemailer.createTransport({
  service: "gmail",
  auth: mail1,
});
export const sendEmail = async (
  email,
  subject,
  html,
  empresa,
  logoUrl,
  logoAttachment
) => {
  console.log(mail.user);
  try {
    await transporter1.sendMail({
      from: `${empresa.name} <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Hola amigos, suscríbance para más videos", // plain text body
      html, // html body
      attachments: [
        {
          filename: "logo.png", // Nombre del archivo adjunto
          path: logoAttachment, // Ruta local del archivo del logo
          cid: "unique@logo.com", // ID único para referenciar este archivo en el HTML
        },
      ],
    });
    return true;
  } catch (error) {
    if (error.code === 'ECONNECTION' && error.errno === 'ETIMEDOUT') {
      console.error(`Error: Tiempo de conexión agotado. Verifica si el puerto ${transporter.options.port} está bloqueado o si hay problemas de conexión a Internet.`);
    } else {
      console.error(`Error al enviar correo electrónico a ${email} con asunto "${subject}":`, error);
    }
    return false;
  }
};
export const sendEmailNotificacion = async (
  email,
  subject,
  text,
  html,
  empresa,
  logoUrl,
  logoAttachment
) => {
  try {

    await transporter.sendMail({
      from: `${empresa} <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: text, // plain text body
      html, // html body
      attachments: [
        
        {
          filename: "logo.png", // Nombre del archivo adjunto
          path: logoAttachment, // Ruta local del archivo del logo
          cid: "unique@logo.com", // ID único para referenciar este archivo en el HTML
        },
      ],
    });
    return true;
  } catch (error) {
    if (error.code === 'ECONNECTION' && error.errno === 'ETIMEDOUT') {
      console.error(`Error: Tiempo de conexión agotado. Verifica si el puerto ${transporter.options.port} está bloqueado o si hay problemas de conexión a Internet.`);
    } else {
      console.error(`Error al enviar correo electrónico a ${email} con asunto "${subject}":`, error);
    }
    return false;
  }
};
export const sendEmail1 = async (
  email,
  subject,
  html,
  empresa,
  logoUrl,
  logoAttachment
) => {
  console.log(mail.user+"hola");
  try {
    await transporter1.sendMail({
      from: `${empresa} <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Hola amigos, suscríbance para más videos",
      html, // html body
      attachments: [
        {
          filename: "logo.png", // Nombre del archivo adjunto
          path: logoAttachment, // Ruta local del archivo del logo
          cid: "unique@logo.com", // ID único para referenciar este archivo en el HTML
        },
      ],
    });
    return true;
  } catch (error) {
    if (error.code === 'ECONNECTION' && error.errno === 'ETIMEDOUT') {
      console.error(`Error: Tiempo de conexión agotado. Verifica si el puerto ${transporter.options.port} está bloqueado o si hay problemas de conexión a Internet.`);
    } else {
      console.error(`Error al enviar correo electrónico a ${email} con asunto "${subject}":`, error);
    }
    return false;
  }
};
export const getTemplate = (name, token,secuencial, logo) => {
  const baseUrl = NEXT_PUBLIC_API_URL || "http://localhost:3500"; // Puedes cambiar "BASE_URL" según tus necesidades
  return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h2>Hola ${name}</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="${baseUrl}/api/confirm?token=:${token}&secuencial=${secuencial}"
                target="_blank"
            >Confirmar Cuenta</a>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
   <div><span style="color: #0000ff;"><strong><span style="color: #000000;">Env&iacute;a campa&ntilde;as de email o crea tu sitio web con</span></strong>&nbsp;<a style="color: #0000ff;" title="SoftCorp &amp;Brieffing" href="https://www.softcorpbrieffing.com/" target="_blank">SOFTCORP</a></span></div>
   <div>&nbsp;</div>
   <blockquote>
     <div><strong>Informaci&oacute;n Importante:</strong><br /><strong>Seg&uacute;n: Ley de comercio electr&oacute;nico, firmas electr&oacute;nicas y mensajes de datos (Ley No. 2002-67)&nbsp;</strong><br /><strong>Art. 6.- Informaci&oacute;n escrita.- Cuando requiera u obligue que la informaci&oacute;n conste por escrito, este requisito quedar&aacute; cumplido con un mensaje de datos, siempre que la informaci&oacute;n que &eacute;ste contenga sea accesible para su posterior consulta.</strong><br /><strong>Art. 7.- Informaci&oacute;n original.- Cuando requiera u obligue que la informaci&oacute;n sea presentada o conservada en su forma original, este requisito quedar&aacute; cumplido con un mensaje de datos, si siendo requerido conforme a la Ley, puede comprobarse que ha conservado la integridad de la informaci&oacute;n, a partir del momento en que se gener&oacute; por primera vez en su forma definitiva, como mensaje de datos.</strong></div>
   </blockquote>

            <div >
            <img src="cid:unique@logo.com" alt="Logo de la empresa" style="max-width: 100px;" />
          </div>
        </div>
      `;
};
export const getTemplateNoficicacion = (
  name,
  url,
  nombre,
  descripcion,
  logo
) => {
  const baseUrl = NEXT_PUBLIC_API_URL || "http://localhost:3500"; // Puedes cambiar "BASE_URL" según tus necesidades
  return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h2>Hola ${name}</h2>
            <p>${nombre}</p>
            <p></p>
            <p>${descripcion}</p>
            <a
                href="${url}"
                target="_blank"
            >Para mayor informacion da clic aqui</a>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
   <div><span style="color: #0000ff;"><strong><span style="color: #000000;">Env&iacute;a campa&ntilde;as de email o crea tu sitio web con</span></strong>&nbsp;<a style="color: #0000ff;" title="SoftCorp &amp;Brieffing" href="https://www.softcorpbrieffing.com/" target="_blank">SOFTCORP</a></span></div>
   <div>&nbsp;</div>
   <blockquote>
     <div><strong>Informaci&oacute;n Importante:</strong><br /><strong>Seg&uacute;n: Ley de comercio electr&oacute;nico, firmas electr&oacute;nicas y mensajes de datos (Ley No. 2002-67)&nbsp;</strong><br /><strong>Art. 6.- Informaci&oacute;n escrita.- Cuando requiera u obligue que la informaci&oacute;n conste por escrito, este requisito quedar&aacute; cumplido con un mensaje de datos, siempre que la informaci&oacute;n que &eacute;ste contenga sea accesible para su posterior consulta.</strong><br /><strong>Art. 7.- Informaci&oacute;n original.- Cuando requiera u obligue que la informaci&oacute;n sea presentada o conservada en su forma original, este requisito quedar&aacute; cumplido con un mensaje de datos, si siendo requerido conforme a la Ley, puede comprobarse que ha conservado la integridad de la informaci&oacute;n, a partir del momento en que se gener&oacute; por primera vez en su forma definitiva, como mensaje de datos.</strong></div>
   </blockquote>
            <div >
            <img src="cid:unique@logo.com" alt="Logo de la empresa" style="max-width: 100px;" />
          </div>
        </div>
      `;
};
export const getTemplate1 = (username, email, code, logo) => {
  console.log(username+" ssssss");
  const baseUrl = NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"; // Puedes cambiar "BASE_URL" según tus necesidades
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <h2>Hola ${username}</h2>
          <p>Para resetaer su contraseña presione el siguiente link</p>
          <a
              href="${baseUrl}/auth/reset/cambiarclave?email=${email}&code=${code}&username=${username}"
              target="_blank"
          >Cambiar su contraseña</a>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
 <div><span style="color: #0000ff;"><strong><span style="color: #000000;">Env&iacute;a campa&ntilde;as de email o crea tu sitio web con</span></strong>&nbsp;<a style="color: #0000ff;" title="SoftCorp &amp;Brieffing" href="https://www.softcorpbrieffing.com/" target="_blank">SOFTCORP</a></span></div>
 <div>&nbsp;</div>
 <blockquote>
   <div><strong>Informaci&oacute;n Importante:</strong><br /><strong>Seg&uacute;n: Ley de comercio electr&oacute;nico, firmas electr&oacute;nicas y mensajes de datos (Ley No. 2002-67)&nbsp;</strong><br /><strong>Art. 6.- Informaci&oacute;n escrita.- Cuando requiera u obligue que la informaci&oacute;n conste por escrito, este requisito quedar&aacute; cumplido con un mensaje de datos, siempre que la informaci&oacute;n que &eacute;ste contenga sea accesible para su posterior consulta.</strong><br /><strong>Art. 7.- Informaci&oacute;n original.- Cuando requiera u obligue que la informaci&oacute;n sea presentada o conservada en su forma original, este requisito quedar&aacute; cumplido con un mensaje de datos, si siendo requerido conforme a la Ley, puede comprobarse que ha conservado la integridad de la informaci&oacute;n, a partir del momento en que se gener&oacute; por primera vez en su forma definitiva, como mensaje de datos.</strong></div>
 </blockquote>
          <div >
            <img src="cid:unique@logo.com" alt="Logo de la empresa" style="max-width: 100px;" />
          </div>
      </div>
    `;
};
export const ContactTemplate = (nameTo, email, nameFrom, message) => {
  return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h2>Hola ${nameTo}</h2>
            <p>Has recibido un mensaje de contacto:</p>
            <p>De: ${email}</p>
            <p>Nombres: ${nameFrom}</p>
            <p>Mensaje: ${message}</p>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
   <div><span style="color: #0000ff;"><strong><span style="color: #000000;">Env&iacute;a campa&ntilde;as de email o crea tu sitio web con</span></strong>&nbsp;<a style="color: #0000ff;" title="SoftCorp &amp;Brieffing" href="https://www.softcorpbrieffing.com/" target="_blank">SOFTCORP</a></span></div>
   <div>&nbsp;</div>
   <blockquote>
     <div><strong>Informaci&oacute;n Importante:</strong><br /><strong>Seg&uacute;n: Ley de comercio electr&oacute;nico, firmas electr&oacute;nicas y mensajes de datos (Ley No. 2002-67)&nbsp;</strong><br /><strong>Art. 6.- Informaci&oacute;n escrita.- Cuando requiera u obligue que la informaci&oacute;n conste por escrito, este requisito quedar&aacute; cumplido con un mensaje de datos, siempre que la informaci&oacute;n que &eacute;ste contenga sea accesible para su posterior consulta.</strong><br /><strong>Art. 7.- Informaci&oacute;n original.- Cuando requiera u obligue que la informaci&oacute;n sea presentada o conservada en su forma original, este requisito quedar&aacute; cumplido con un mensaje de datos, si siendo requerido conforme a la Ley, puede comprobarse que ha conservado la integridad de la informaci&oacute;n, a partir del momento en que se gener&oacute; por primera vez en su forma definitiva, como mensaje de datos.</strong></div>
   </blockquote>
            <div >
            <img src="cid:unique@logo.com" alt="Logo de la empresa" style="max-width: 100px;" />
          </div>
        </div>
      `;
};
export const messageTemplate = (nameTo, email, nameFrom, message) => {
  return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h2>Hola ${nameTo}</h2>
            <p>Has recibido un mensaje de contacto:</p>
            <p>De: ${email}</p>
            <p>Nombres: ${nameFrom}</p>
            <p>Mensaje: ${message}</p>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
   <div><span style="color: #0000ff;"><strong><span style="color: #000000;">Env&iacute;a campa&ntilde;as de email o crea tu sitio web con</span></strong>&nbsp;<a style="color: #0000ff;" title="SoftCorp &amp;Brieffing" href="https://www.softcorpbrieffing.com/" target="_blank">SOFTCORP</a></span></div>
   <div>&nbsp;</div>
   <blockquote>
     <div><strong>Informaci&oacute;n Importante:</strong><br /><strong>Seg&uacute;n: Ley de comercio electr&oacute;nico, firmas electr&oacute;nicas y mensajes de datos (Ley No. 2002-67)&nbsp;</strong><br /><strong>Art. 6.- Informaci&oacute;n escrita.- Cuando requiera u obligue que la informaci&oacute;n conste por escrito, este requisito quedar&aacute; cumplido con un mensaje de datos, siempre que la informaci&oacute;n que &eacute;ste contenga sea accesible para su posterior consulta.</strong><br /><strong>Art. 7.- Informaci&oacute;n original.- Cuando requiera u obligue que la informaci&oacute;n sea presentada o conservada en su forma original, este requisito quedar&aacute; cumplido con un mensaje de datos, si siendo requerido conforme a la Ley, puede comprobarse que ha conservado la integridad de la informaci&oacute;n, a partir del momento en que se gener&oacute; por primera vez en su forma definitiva, como mensaje de datos.</strong></div>
   </blockquote>
        </div>
      `;
};