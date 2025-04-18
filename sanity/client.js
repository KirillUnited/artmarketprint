"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var next_sanity_1 = require("next-sanity");
exports.client = (0, next_sanity_1.createClient)({
    projectId: 'p5q8f9ac',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: false,
});
