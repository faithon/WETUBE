import app from "./app";

const PORT = 4000;

const handleListening = (req, res) => {
    console.log(`listening at http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);