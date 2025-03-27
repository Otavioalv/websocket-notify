"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const router_1 = require("./routers/router");
const socketIO_1 = require("./utils/socketIO");
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: config_1.configAPI.validAddress,
    credentials: true
}));
app.use('/picturesWb', express_1.default.static(path_1.default.join(__dirname, 'picturesWb')));
app.use((err, req, res, next) => {
    res.status(404).send({
        messase: "Erro desconhecido"
    });
});
app.use('/notify', router_1.router);
app.use('/*', (req, res) => { res.status(200).send({ message: "router not exists" }); });
const PORT = parseInt(config_1.configAPI.port);
const HOST = config_1.configAPI.publicHost;
const server = http_1.default.createServer(app);
(0, socketIO_1.initializeSocketIO)(server, app);
server.listen(PORT, HOST, async () => {
    console.log(`Listening in url local: http://${config_1.configAPI.localHost}:${PORT} and http://${config_1.configAPI.publicHost}:${PORT}`);
});
