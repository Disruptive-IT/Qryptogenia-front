export function ParseCSSGradient(cssGradient) {
  const result = {
    type: "",
    colorStops: [],
  };

  if (
    !cssGradient ||
    (!cssGradient.startsWith("radial-gradient") &&
      !cssGradient.startsWith("linear-gradient"))
  ) {
    throw new Error("Formato de gradiente no soportado o gradiente vacío.");
  }

  if (cssGradient.startsWith("radial-gradient")) {
    result.type = "radial";
  } else if (cssGradient.startsWith("linear-gradient")) {
    result.type = "linear";
  }

  const gradientContent = cssGradient.replace(/.*\((.+)\)/, "$1").trim();
  const gradientParts = gradientContent.split(",");

  if (result.type === "linear") {
    const firstPart = gradientParts[0].trim();
    if (firstPart.includes("deg")) {
      result.rotation = parseFloat(firstPart.replace("deg", "").trim());
      gradientParts.shift();
    } else {
      result.rotation = 0;
    }
  }

  gradientParts.forEach((part) => {
    const match = part.match(/(#[a-fA-F0-9]{3,6}|rgba?\([^)]+\)|[a-zA-Z]+)/);
    if (match) {
      const color = match[1].trim();
      const offset = part.replace(color, "").trim();
      result.colorStops.push({
        color: color,
        offset: offset ? parseFloat(offset.replace("%", "")) / 100 : 0,
      });
    }
  });

  if (result.colorStops.length === 0) {
    throw new Error("colorStops is required");
  }

  return result;
}

  