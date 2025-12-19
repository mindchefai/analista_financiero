// constants.ts

// Reglas de categorización automática
export const CATEGORIA_RULES = {
  venta: [
    /transfer.*en div/i, /ingreso/i, /cobro/i, /venta/i, /factura/i, 
    /pago.*recibido/i, /abono/i, /stripe/i, /paypal/i
  ],
  gastos: [
    /google ads/i, /facebook/i, /facebk/i, /canva/i, /publicidad/i, /marketing/i,
    /office/i, /microsoft/i, /adobe/i, /hosting/i, /dominio/i, /servidor/i,
    /aws/i, /azure/i, /dropbox/i, /zoom/i, /software/i, /licencia/i,
    /suscripcion/i, /alquiler/i, /luz/i, /agua/i, /telefono/i, /internet/i,
    /gestor/i, /asesoria/i, /seguro/i, /banco/i, /comision/i
  ],
  personal: [
    /nomina/i, /salario/i, /sueldo/i, /tgss/i, /seguridad social/i,
    /cotizacion/i, /irpf/i, /autonomo/i,
  ],
  materia: [
    /compra/i, /proveedor/i, /material/i, /suministro/i,
    /mercaderia/i, /stock/i,
  ],
  otros: [
    /varios/i, /diverso/i, /miscelaneo/i
  ]
};