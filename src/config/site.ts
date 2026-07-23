/**
 * Site-wide constants — contact details, links and helpers.
 * Central home for the values that were hard-coded across the original HTML.
 */

export const PHONE_PRIMARY = '+917231042253';
export const PHONE_SECONDARY = '+917300359127';
export const PHONE_PRIMARY_DISPLAY = '+91 72310 42253';
export const PHONE_SECONDARY_DISPLAY = '+91 73003 59127';

export const WHATSAPP_NUMBER = '917231042253';

export const INSTAGRAM_URL = 'https://www.instagram.com/behna_clothing_studio/';
export const YOUTUBE_URL = 'https://www.youtube.com/channel/UCqkJZisHnd1wD8gK0ailsxA';

export const MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir//Behna+Clothing+Studio,+Plot+Number:+60,+Lalarpura,+Jaipur,+Rajasthan+302021/@26.9000762,75.7255187,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x396db53942ba9fbd:0x97e0587939931edd!2m2!1d75.7243111!2d26.9051636?entry=ttu';

export const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=26.9051636,75.7243111&output=embed&z=17';

export const ADDRESS_LINES = [
  'Plot No. 60, Gandhi Path West',
  'Lalarpura, Jaipur 302021',
  'Rajasthan, India',
];

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
