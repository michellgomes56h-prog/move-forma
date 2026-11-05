/* =====================================================================
   CONFIGURAÇÃO DO SITE — edite SÓ AQUI.
   ===================================================================== */

/** WhatsApp no formato 55 + DDD + número, só dígitos. Ex.: '5555999999999'
 *  TODO(cliente): trocar pelo número real da Move Forma. */
export const NUMERO_WHATSAPP = '{{NUMERO_WHATSAPP}}';

/** Horários de atendimento — cada item vira uma linha no site.
 *  TODO(cliente): trocar pelos horários reais. */
export const HORARIOS = [
  { dias: '{{HORARIOS}}', horas: '' },
  // Exemplo de formato:
  // { dias: 'Segunda a sexta', horas: '06h às 21h' },
  // { dias: 'Sábado', horas: '08h às 12h' },
];

export const INSTAGRAM = {
  usuario: '@moveforma_',
  url: 'https://instagram.com/moveforma_',
};

export const ENDERECO = {
  rua: 'Rua Rubens Kraemer, 220',
  cidade: 'Giruá/RS',
  cep: '98870-000',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Rubens+Kraemer,+220,+Giru%C3%A1+-+RS,+98870-000',
  embedUrl: 'https://www.google.com/maps?q=Rua+Rubens+Kraemer,+220,+Giru%C3%A1+-+RS,+98870-000&output=embed',
};

/** Mensagens pré-preenchidas do WhatsApp (chave = data-wa no HTML). */
export const MENSAGENS = {
  padrao: 'Olá! Vim pelo site da Move Forma e gostaria de agendar um horário.',
  saude: 'Olá! Vim pelo site da Move Forma e tenho interesse em musculação para saúde. Como funciona?',
  emagrecimento: 'Olá! Vim pelo site da Move Forma e quero começar um treino para emagrecimento. Como funciona?',
  hipertrofia: 'Olá! Vim pelo site da Move Forma e quero treinar para hipertrofia. Como funciona?',
  stepdance: 'Olá! Tenho interesse no Step Dance. Como funciona?',
};
