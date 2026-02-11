function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Promesa resuelta después de " + ms + " ms"), ms);
  });
}

document.getElementById("btn").addEventListener("click", () => {
  const salida = document.getElementById("resultado");
  salida.textContent = "Esperando...";

  esperar(2000).then((mensaje) => {
    salida.textContent = mensaje;
  });
});
