import { connectionDB } from "../database/db.js";

export async function getGames(req, res) {
    const { name } = req.query;

    try {
        //REVISAR ESSA PARTE
        if (name) {
            const existGame = await connectionDB.query(`SELECT * FROM games WHERE name ILIKE '${name}'`);

            if (existGame.rows > 0) {
                res.send(existGame.rows);
            } else {
                res.send("Não existe jogo com esse nome")
            }

        } else {
            const allGames = await connectionDB.query("SELECT * FROM games");
            console.log("allGames", allGames.rows);
            res.send(allGames.rows);
        }
    }
    catch (err) {
        console.log("err postGames", err.message);
        res.status(500).send('Server not running');
    }
};

export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.info;
    const info = req.info;
    console.log("info", info);

    try {

        await connectionDB.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
            [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);

    }
    catch (err) {

        console.log("err postGames", err.message);
        res.status(500).send('Server not running');

    }
};