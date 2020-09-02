export function captChaImg (res) {
  return `data:image/png;base64,${btoa(
        new Uint8Array(res).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
        )
    )}`
}
