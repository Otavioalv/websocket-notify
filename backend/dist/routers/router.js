"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authenticatedRouter_1 = require("../utils/authenticatedRouter");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
exports.router = router;
router.post('/', async (req, res) => {
    res.status(200).send({ message: "router finded" });
});
router.post('/create-user', async (req, res) => {
    await new UserController_1.UserController().createUser(req, res);
});
router.post('/login-user', async (req, res) => {
    await new UserController_1.UserController().loginUser(req, res);
});
router.post('/logout-user', async (req, res) => {
    await new UserController_1.UserController().logoutUser(req, res);
});
router.post('/list-users', authenticatedRouter_1.authenticatedRouter, async (req, res) => {
    await new UserController_1.UserController().listUsers(req, res);
});
router.post('/list-menssages/:userId', authenticatedRouter_1.authenticatedRouter, async (req, res) => {
    await new UserController_1.UserController().listMenssages(req, res);
});
router.post("/list-user-from-token", authenticatedRouter_1.authenticatedRouter, async (req, res) => {
    await new UserController_1.UserController().listUserFromToken(req, res);
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/picturesWb');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path_1.default.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// função upload.single('image') -> zera o REQUEST
router.post('/upload-picture', upload.single('image'), authenticatedRouter_1.authenticatedRouter, async (req, res) => {
    await new UserController_1.UserController().uploadPicture(req, res);
});
router.post("/update-user", upload.single('image'), authenticatedRouter_1.authenticatedRouter, async (req, res) => {
    await new UserController_1.UserController().updateUser(req, res);
});
