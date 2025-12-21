// constants.ts - MEJORADO CON REGLAS BASADAS EN TUS DATOS REALES

// Reglas de categorización automática
export const CATEGORIA_RULES = {
  // ============= VENTAS =============
  // Patrones para detectar ventas (importes positivos)
  venta: [
    /ventas?\s*tpv/i,
    /cobros?\s*(del\s*)?d[ií]a/i,  // Cobros del día (con encoding corregido)
    /tpv/i,
    /datafono/i,
    /ingreso/i,
    /transfer.*en div/i,
    /pago.*recibido/i,
    /abono/i,
    /stripe/i,
    /paypal/i,
    /bizum.*recibido/i,
  ],

  // ============= PERSONAL =============
  // Nóminas, salarios, seguros sociales
  personal: [
    /n[oó]mina/i,
    /nomina/i,
    /salario/i,
    /sueldo/i,
    /cocinero/i,
    /camarero/i,
    /ayudante\s*cocina/i,
    /jefe\s*de\s*cocina/i,
    /chef/i,
    /empleado/i,
    /trabajador/i,
    // Seguridad Social
    /seg\s*social/i,
    /seguridad\s*social/i,
    /ss\.ss/i,
    /tgss/i,
    /cotizaci[oó]n/i,
    /cotizacion/i,
    // Retenciones
    /irpf/i,
    /retencion/i,
    /retenci[oó]n/i,
    /aut[oó]nomo/i,
    /autonomo/i,
  ],

  // ============= MATERIA PRIMA =============
  // Proveedores de alimentos y bebidas
  materia: [
    // Pescados y mariscos
    /pescad[oa]/i,
    /pescader[ií]a/i,
    /marisco/i,
    /marisquer[ií]a/i,
    // Carnes
    /carn[íie]/i,
    /c[aá]rnica/i,
    /carnicer[ií]a/i,
    // Frutas y verduras
    /fruta/i,
    /verdura/i,
    /hortaliza/i,
    /frutería/i,
    /frutas\s+gomez/i,
    // Distribuidores
    /distribuciones?\s+vino/i,
    /distribuciones?/i,
    /distribuidor/i,
    // Bebidas
    /vino/i,
    /bebida/i,
    /cerveza/i,
    /licor/i,
    /bodega/i,
    // Panaderías
    /panader[ií]a/i,
    /panaderia/i,
    /pan\s+diario/i,
    /pan\s+artesa/i,
    // Supermercados mayoristas
    /makro/i,
    /metro/i,
    /cash/i,
    // Lácteos y otros
    /l[aá]cteo/i,
    /queso/i,
    /embutido/i,
    /chaciner[ií]a/i,
    // Compras generales de comida
    /compra\s+alimentaci[oó]n/i,
    /alimentaci[oó]n/i,
    /comida/i,
    /alimento/i,
  ],

  // ============= GASTOS GENERALES =============
  gastos: [
    // Suministros (luz, agua, gas)
    /luz/i,
    /electricidad/i,
    /iberdrola/i,
    /endesa/i,
    /naturgy/i,
    /agua/i,
    /gas/i,
    // Telecomunicaciones
    /tel[eé]fono/i,
    /telefono/i,
    /internet/i,
    /telef[oó]nica/i,
    /movistar/i,
    /vodafone/i,
    /orange/i,
    /masmovil/i,
    // Mantenimiento y reparaciones
    /reparaci[oó]n/i,
    /reparacion/i,
    /mantenimiento/i,
    /arreglo/i,
    // Limpieza
    /limpieza/i,
    /limpiador/i,
    /higiene/i,
    // Honorarios profesionales
    /honorario/i,
    /gestor/i,
    /gestor[ií]a/i,
    /asesor/i,
    /asesor[ií]a/i,
    /abogado/i,
    /notario/i,
    /contable/i,
    // Alquileres
    /alquiler/i,
    /arrendamiento/i,
    /renta/i,
    /arendo/i,
    // Seguros
    /seguro/i,
    /p[oó]liza/i,
    /prima\s+seguro/i,
    // Bancarios
    /banco/i,
    /comisi[oó]n/i,
    /comision/i,
    /mantenimiento\s+cuenta/i,
    // Marketing y publicidad
    /google\s*ads/i,
    /facebook/i,
    /facebk/i,
    /instagram/i,
    /publicidad/i,
    /marketing/i,
    /anuncio/i,
    // Software y suscripciones
    /office/i,
    /microsoft/i,
    /adobe/i,
    /canva/i,
    /hosting/i,
    /dominio/i,
    /servidor/i,
    /aws/i,
    /azure/i,
    /dropbox/i,
    /zoom/i,
    /software/i,
    /licencia/i,
    /suscripci[oó]n/i,
    /suscripcion/i,
  ],

  // ============= OTROS =============
  otros: [
    /varios/i,
    /diverso/i,
    /oficina/i,
    /miscel[aá]neo/i,
    /otro/i,
  ],
};

// Lista de categorías disponibles (para el selector)
export const CATEGORIAS = [
  'venta',
  'personal', 
  'materia',
  'gastos',
  'otros'
] as const;

export type Categoria = typeof CATEGORIAS[number];