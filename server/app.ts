import express from 'express';
import * as http from 'http';
import cors from 'cors';
import { CommonRoutesConfig } from './src/common/commonRoutesConfig';
import { UserRoutes } from './src/users/usersRoutesConfig';
import { AlmacenRoutes } from './src/almacen/almacenRoutesConfig';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 4000;
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json({ limit: '50mb' }));
app.use(cors());

routes.push(new UserRoutes(app));
routes.push(new AlmacenRoutes(app));

server.listen(port, ()=>console.log(`Server runnin at http://localhost:${port}`));