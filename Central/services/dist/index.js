"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
let bodyParser = require('body-parser');
const app = (0, express_1.default)();
const cors = require('cors');
const { body, validationResult } = require('express-validator');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();
const client = require('./config/esclient');
const port = process.env.PORT;
app.post("/login", body('email').isEmail().normalizeEmail(), body('password'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield client.search({
        index: 'users',
        body: {
            query: {
                bool: {
                    must: [{
                            match_phrase: {
                                email: req.body.email
                            }
                        },
                        {
                            match_phrase: {
                                password: req.body.password
                            }
                        }
                    ]
                }
            }
        }
    });
    const errors = validationResult(req);
    if (!errors.isEmpty() || !data.hits.hits.length) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    res.status(200).json({
        success: true,
        message: 'Login successful',
    });
}));
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // await client.index({
    //   index: 'users',
    //   document: {
    //     email: 'nicholas@utiltyx.com',
    //     password: 'util@123'
    //   }
    // });
}));
app.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: 'logout successful',
    });
}));
// api to get vulnerabilities
app.get('/vulnerabilities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client.search({
        index: 'ge_nvd_index',
        size: req.query.size || 10,
        from: req.query.from || 0,
        sort: [
            {
                'published': {
                    mode: 'avg',
                    order: 'desc',
                }
            }
        ]
    });
    res.status(200).json({
        success: true,
        data: result === null || result === void 0 ? void 0 : result.hits.hits,
    });
}));
// api to get vulnerabilities
app.get('/vulnerabilities/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const total_cve = yield client.count({
        index: 'ge_nvd_index'
    });
    const prioritized = yield client.count({
        index: 'ge_nvd_index',
        body: {
            query: {
                bool: {
                    must: [{
                            match_phrase: {
                                vulnStatus: 'Analyzed'
                            }
                        },
                    ]
                }
            }
        }
    });
    const result = {
        total_cve: total_cve.count,
        prioritized: prioritized.count,
        critical: 120,
        confidence: '51%',
    };
    res.status(200).json({
        success: true,
        data: result,
    });
}));
// api to add vulnerabilities
app.post('/vulnerabilities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client.index({
        index: 'vulnerabilities',
        document: req.body,
    });
    res.status(200).json({
        success: true,
        message: 'vulnerabilities added successful',
        data: result,
    });
}));
// api to get assets
app.get('/assets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let payload = {
        index: 'ge_assets',
        size: req.query.size || 10,
        from: req.query.offset || 0,
    };
    if (req.query.filter) {
        const filter = String(req.query.filter).split(":");
        payload['body'] = {
            query: {
                bool: {
                    filter: [
                        {
                            "wildcard": {
                                [filter === null || filter === void 0 ? void 0 : filter[0]]: "*" + (filter === null || filter === void 0 ? void 0 : filter[1]) + "*",
                            }
                        },
                    ]
                }
            }
        };
    }
    ;
    const result = yield client.search(payload);
    res.status(200).json({
        success: true,
        data: result === null || result === void 0 ? void 0 : result.hits.hits,
    });
}));
app.patch('/assets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, updatedData } = req.body;
    const result = yield client.update({
        index: 'ge_assets',
        id: id,
        doc: updatedData
    });
    if (result) {
        res.status(200).json({
            success: true,
            data: result,
        });
    }
}));
// api to add assets
app.post('/assets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client.index({
        index: 'ge_assets',
        document: req.body,
    });
    res.status(200).json({
        success: true,
        message: 'assets added successful',
        data: result,
    });
}));
app.get('/topology', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client.search({
        index: 'ge_topo_index',
        size: req.body.size || 10,
        from: req.body.count || 0,
    });
    res.status(200).json({
        success: true,
        data: result === null || result === void 0 ? void 0 : result.hits.hits,
    });
}));
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
