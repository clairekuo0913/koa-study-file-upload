"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var path_1 = __importDefault(require("path"));
var koa_static_1 = __importDefault(require("koa-static"));
var koa_body_1 = __importDefault(require("koa-body"));
var koa_router_1 = __importDefault(require("koa-router"));
var fs_1 = __importDefault(require("fs"));
var app = new koa_1.default();
var router = new koa_router_1.default();
app.use(koa_body_1.default({
    multipart: true,
    encoding: 'gzip',
    formidable: {
        keepExtensions: true,
        maxFileSize: 200 * 1024 * 1024 // default max file size
    }
}));
// Get
router.get('/', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var pathUrl;
    return __generator(this, function (_a) {
        ctx.type = 'html';
        pathUrl = path_1.default.join(__dirname, '/static/upload.html');
        ctx.body = fs_1.default.createReadStream(pathUrl);
        return [2 /*return*/];
    });
}); });
// Post: upload
var uploadUrl = "http://localhost:3000/static/upload";
router.post('/upload', koa_body_1.default(), function (ctx) {
    var file = ctx.request.files.file;
    console.log(file);
    var fileReader = fs_1.default.createReadStream(file.path);
    console.log(fileReader);
    var filePath = path_1.default.join(__dirname, '/static/upload/');
    var fileResource = filePath + ("/" + file.name);
    var writeStream = fs_1.default.createWriteStream(fileResource);
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.mkdir(filePath, function (err) {
            if (err) {
                throw new Error(err.toString());
            }
            else {
                fileReader.pipe(writeStream);
                ctx.body = {
                    url: uploadUrl + ("/" + file.name),
                    code: 0,
                    message: "Upload successful."
                };
            }
        });
    }
    else {
        fileReader.pipe(writeStream);
        ctx.body = {
            url: uploadUrl + ("/" + file.name),
            code: 0,
            message: "Upload successful."
        };
    }
});
app.use(koa_static_1.default(path_1.default.join(__dirname)));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
