const whiteList = ["http://localhost:3000"];

export default function cors(origin, callback) {
  if (!origin || whiteList.includes(origin)) {
    return callback(null, origin);
  }
  return callback("Error de CORS origin: " + origin + " No autorizado!");
}
