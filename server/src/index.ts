import {MainServer} from "./server";
import dotenv from 'dotenv';
dotenv.config();
const mainServer = new MainServer();
const PORT=process.env.PORT || 3000;


mainServer.server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} url: http://localhost:${PORT}`);
})