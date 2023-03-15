
export const functionApiWord = async () => {
  const res = await fetch('https://catfact.ninja/fact')
  const data = await res.json()
  const word = data.fact.split(' ', 3).join(' ')
  return word
}
