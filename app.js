const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para manipular la solicitud
app.use((req, res, next) => {
    // Realiza operaciones en la solicitud, por ejemplo, extraer datos
    console.log('Solicitud recibida por:', req.headers['user-agent']);
    next(); // Pasa la solicitud al siguiente middleware/ruta
});

// Middleware para manipular la respuesta
app.use((req, res, next) => {
    // Establece encabezados de respuesta
    res.setHeader('Content-Type', 'text/plain');
    next(); // Pasa la respuesta al siguiente middleware/ruta
});

// Ruta final que envía la respuesta
app.get('/', (req, res) => {
    // Envía datos de respuesta al cliente
    res.send('¡Hola, soy una respuesta que fui procesada!');
});

// Ruta que genera un error

app.get('/error', (req, res, next) => {
    try {
        // Generar un error
        throw new Error('Este es un error de ejemplo');
        res.send('¡Hola, soy una respuesta que fui procesada!');

    } catch (err) {
        // Enviar una respuesta de error al cliente
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
});

// ...existing code...

app.get('/estados',(req, res)=>{
    const estados = [
        'Jalisco',
        'Nuevo León',
        'Puebla',
        'Chihuahua',
        'Veracruz'
    ];
    res.json(estados);
});

// ...existing code...

app.get('/pares', (req, res) => {
    const pares = [];
    for (let i = 1; pares.length < 10; i++) {
        if (i % 2 === 0) {
            pares.push(i);
        }
    }
    res.json(pares);
});

// ...existing code...

app.get('/comparar/:num1/:num2', (req, res) => {
    const num1 = Number(req.params.num1);
    const num2 = Number(req.params.num2);
    const sonIguales = num1 === num2;
    res.json({ iguales: sonIguales });
});

// ...existing code...

// Middleware para imprimir mensaje en consola
app.use((req, res, next) => {
    console.log('SE HA REALIZADO UNA SOLICITUD');
    next();
});

// ...existing code...

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// ...existing code...

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    // Obtener el código de estado por defecto o asignar 500 si no se proporciona
    const status = err.status || 500;

    // Enviar una respuesta de error al cliente
    res.status(status).json({ error: err.message });
});


app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});