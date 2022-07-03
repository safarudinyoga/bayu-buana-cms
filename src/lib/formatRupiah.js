const formatRupiah = (angka, prefix) => {
  if (!angka) return ''

  const number_string = angka.toString().replace(/[^,\d]/g, '')
  const split = number_string.split(',')
  const sisa = split[0].length % 3
  let rupiah = split[0].substr(0, sisa)
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi)

  if (ribuan) {
    const separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }

  rupiah = split[1] !== undefined ? `${rupiah},${split[1]}` : rupiah
  return prefix === undefined ? rupiah : rupiah ? `Rp. ${rupiah}` : ''
}

const deFormatRupiah = (angka = '') => {
  if (!angka) return ''

  if (angka.length && angka.substring(0, 3) === 'Rp.') {
    const number = String(angka).slice(3)
    return Number(number)
  }

  if (angka.length) {
    const number = String(angka).replace(/[.,\s]/g, '')
    return Number(number)
  }

  return angka
}

export { formatRupiah, deFormatRupiah }