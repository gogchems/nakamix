/**
 * Decode Nakanime's XOR-obfuscated API response.
 * The key is derived from the exact request path, including the query string.
 */
export function decryptNakanimeResponse(input, requestPath) {
  const data = Buffer.isBuffer(input) ? input : Buffer.from(input);
  const seed = `nkapiv1${requestPath}`;
  const key = Buffer.alloc(32);

  for (let offset = 0; offset < key.length; offset += 1) {
    let value = 0;
    for (const character of seed) {
      value = (value * 31 + character.codePointAt(0) + offset) & 0xff;
    }
    key[offset] = value;
  }

  const output = Buffer.alloc(data.length);
  for (let index = 0; index < data.length; index += 1) {
    output[index] = data[index] ^ key[index % key.length];
  }
  return output.toString('utf8');
}

export function decodeNakanimeJson(input, requestPath) {
  const decoded = decryptNakanimeResponse(input, requestPath);
  return JSON.parse(decoded);
}
