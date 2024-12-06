/*
 * @Author : Nicolas Barrios,   @date 2024-10-25 11:26:05
 * @description : componente que guarda las funciones que configuran los colores de los iconos d elos botones segun la luminancia de la pantalla
 * @Props :
 * @return :
 */

//esta funcion extrar los valores individuales y retorna el rgb del color
export const extractColorFromGradient = (gradient, percentageFromBottom) => {
    const colors = gradient.match(/rgb\(\d+, \d+, \d+\)/g);
    const stops = gradient.match(/(\d+(\.\d+)?)%/g);

    const percentage = 100 - percentageFromBottom;

    let color1 = colors[0];
    let color2 = colors[1];
    let stop1 = parseFloat(stops[0]);
    let stop2 = parseFloat(stops[1]);

    if (percentage <= stop1) return color1;
    if (percentage >= stop2) return color2;

    const ratio = (percentage - stop1) / (stop2 - stop1);
    const [r1, g1, b1] = color1.match(/\d+/g).map(Number);
    const [r2, g2, b2] = color2.match(/\d+/g).map(Number);

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  //calcula la luminancia
  export const isDarkColor = (color) => {
    // El color puede ser un valor hexadecimal (#rrggbb) o rgb(r, g, b)
    const rgb = color.match(/\d+/g);
    const [r, g, b] = rgb ? rgb.map(Number) : [0, 0, 0];

    // Calcular la luminancia relativa usando la fórmula de luminancia
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

    // Considera el color oscuro si la luminancia es menor a 0.5
    return luminance < 0.5;
  };

  //funcion resize image
  export const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // Resize the image
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            let dataUrl;
            if (file.type === 'image/png') {
                // If the file is PNG, convert to PNG
                dataUrl = canvas.toDataURL("image/png");
            } else {
                // If the file is not PNG, convert to JPEG with compression
                dataUrl = canvas.toDataURL("image/jpeg", 0.7); // 0.7 is the quality level for JPEG
            }
            callback(dataUrl);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
};

export const handleSetIsDark=(variable,setDarkHandler)=>{
    if(variable){
        if(variable.startsWith('linear-gradient')){
          const colorAt30Percent=extractColorFromGradient(variable,30);
          setDarkHandler(isDarkColor(colorAt30Percent) ? '#ffffff' : '#000000');
        }else{
          setDarkHandler(isDarkColor(variable) ? '#ffffff' : '#000000');
        }
    }
}