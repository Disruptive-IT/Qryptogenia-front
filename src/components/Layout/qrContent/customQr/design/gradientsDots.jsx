export function ParseCSSGradient(cssGradient) {
    const result = {
      type: "",
      colorStops: []
    };
  
    // Detectar el tipo de gradiente.
    if (cssGradient.startsWith("radial-gradient")) {
      result.type = "radial";
    } else if (cssGradient.startsWith("linear-gradient")) {
      result.type = "linear";
    } else {
      throw new Error("Formato de gradiente no soportado.");
    }
  
    // Extraer los valores dentro de los paréntesis del gradiente.
    const gradientContent = cssGradient
      .replace(/.*\((.+)\)/, "$1") // Extrae el contenido dentro de los paréntesis.
      .trim();
  
    // Separar las propiedades (dirección y color stops).
    const gradientParts = gradientContent.split(",");
  
    // Si es un gradiente lineal, el primer valor puede ser la dirección.
    if (result.type === "linear") {
      const firstPart = gradientParts[0].trim();
      if (firstPart.includes("deg")) {
        // Extraer el ángulo de rotación.
        result.rotation = parseFloat(firstPart.replace("deg", "").trim());
        gradientParts.shift(); // Elimina la dirección para trabajar solo con los colores.
      } else {
        result.rotation = 0; // Si no hay dirección, se asume horizontal por defecto.
      }
    }
  
    // Procesar los "color stops".
    gradientParts.forEach((part) => {
      const [color, offset] = part.trim().split(/\s+/); // Separar color y porcentaje.
      result.colorStops.push({
        color: color.trim(),
        offset: parseFloat(offset) / 100 || 0 // Convertir porcentaje a decimal.
      });
    });
  
    return result;
  }
  