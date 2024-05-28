
import createServer from "./functions/server";


export const app = createServer()

const port = 3000;



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
/*
    1. user
    2. wyszukiwanie
    3. sortowanie 
*/