const  detectImageMime = (buffer) => {
  if (!buffer) return "image/jpeg"; // fallback

  const hex = buffer.toString("hex", 0, 4);

  // JPEG
  if (hex.startsWith("ffd8")) return "image/jpeg";

  // PNG
  if (hex === "89504e47") return "image/png";

  // GIF
  if (hex.startsWith("474946")) return "image/gif";

  // WEBP (RIFF....WEBP)
  if (buffer.toString("ascii", 0, 4) === "RIFF") return "image/webp";

  // fallback
  return "image/jpeg";
};

export default detectImageMime;
