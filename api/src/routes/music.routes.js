import { Router } from "express";

// Simulación de base de datos
const musicData = {
    '1': {
        selectedOptions: [
            { value: 'youtube', url: 'https://youtube.com' },
            { value: 'spotify', url: 'https://spotify.com' },
            // ... otras opciones
        ],
        backgroundColor: 'linear-gradient(180deg, rgb(0, 0, 0) 0.00%,rgb(50, 152, 153) 100.00%)',
        borderColor: '#000000',
        image: 'https://cdn.venngage.com/template/thumbnail/small/679bf7bb-2170-4d54-9485-240baa4ae33c.webp',
        titleColor: '#ff0000',
        descriptionColor: '#00ff00',
        title: 'Título de Ejemplo',
        description: 'Descripción de Ejemplo',
    },
    '2': {
      selectedOptions: [
          { value: 'deezer', url: 'https://soundcloud.com' },
          { value: 'soundcloud', url: 'https://soundcloud.com' },
          // ... otras opciones
      ],
      backgroundColor: 'linear-gradient(180deg, rgb(340, 93, 8) 0.00%,rgb(100, 60, 14) 100.00%)',
      borderColor: '#000000',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFSV4bhdtvdDcYLu7aElxiHHvw1ReH5EsZWA&s',
      titleColor: '#ff0000',
      descriptionColor: '#00ff00',
      title: 'Título de Ejemplo',
      description: 'Descripción de Ejemplo',
  }
    // ... otras entradas
  };

const router = Router();

// Ruta para obtener los valores del formulario de música por ID
router.get('/music/:id', (req, res) => {
    const id = req.params.id;
    const data = musicData[id];
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: 'Datos no encontrados' });
    }
});

export default router;