//? HACER REFERENCIA A LA FUNCION SIEMPRE QUE SE NECESITE TOMAR LA FECHA ACTUAL
function getDate() {
  let dateCurrent = new Date();
  dateCurrent.setHours(dateCurrent.getHours() - 5);
  return dateCurrent;
}

export { getDate };
