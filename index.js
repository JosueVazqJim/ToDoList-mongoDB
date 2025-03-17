import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import router from "./routes/itemRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

// Conectar a la base de datos
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

// Usar las rutas definidas
app.use("/", router);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
