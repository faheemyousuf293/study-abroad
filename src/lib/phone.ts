/** Digits of a phone number in international form without "+", assuming Pakistan for local numbers (03001234567 → 923001234567). */
export function internationalDigits(phone: string) {
  let d = phone.replace(/\D/g, '')
  if (d.startsWith('00')) d = d.slice(2)
  else if (d.startsWith('0')) d = `92${d.slice(1)}`
  else if (d.length === 10 && d.startsWith('3')) d = `92${d}`
  return d
}

export const telHref = (phone: string) => `tel:+${internationalDigits(phone)}`
export const whatsappHref = (phone: string) => `https://wa.me/${internationalDigits(phone)}`
