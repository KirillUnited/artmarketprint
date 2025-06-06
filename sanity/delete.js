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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
var DOC_TYPE = 'product'; // Replace with the type you want to delete
function deleteAll() {
    return __awaiter(this, arguments, void 0, function (type) {
        if (type === void 0) { type = DOC_TYPE; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.client.delete({ query: "*[_type == $product]", params: { product: type } })
                        .then(function (res) {
                        console.log(res, 'All documents deleted successfully!');
                    })
                        .catch(function (err) {
                        console.error(err);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteAllOfType() {
    return __awaiter(this, void 0, void 0, function () {
        var docs, batchSize, i, batch, ids, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, client_1.client.fetch("*[_type == $type]{_id}", { type: DOC_TYPE })];
                case 1:
                    docs = _a.sent();
                    if (docs.length === 0) {
                        console.log("No documents of type \"".concat(DOC_TYPE, "\" found."));
                        return [2 /*return*/];
                    }
                    batchSize = 100;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < docs.length)) return [3 /*break*/, 6];
                    batch = docs.slice(i, i + batchSize);
                    ids = batch.map(function (doc) { return doc._id; });
                    return [4 /*yield*/, client_1.client.delete({ query: "*[_id in $ids]._id", params: { ids: ids } })];
                case 3:
                    _a.sent();
                    console.log("Deleted batch ".concat(i / batchSize + 1, ": ").concat(ids.length, " documents."));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 4:
                    _a.sent(); // Delay for 1 second
                    _a.label = 5;
                case 5:
                    i += batchSize;
                    return [3 /*break*/, 2];
                case 6:
                    console.log("All documents of type \"".concat(DOC_TYPE, "\" have been deleted."));
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.error('Error deleting documents:', err_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
deleteAll();
