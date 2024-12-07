import {MainServer} from "./server";
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const mainServer = new MainServer();
const PORT=process.env.PORT || 3000;

const dir = './uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

mainServer.server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} url: http://localhost:${PORT}`);
})