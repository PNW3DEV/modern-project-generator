"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMessage = void 0;
const chalk_1 = __importDefault(require("chalk"));
const package_json_1 = require("../package.json");
exports.initMessage = () => {
    console.info(`${chalk_1.default.green('Welcome to the Modern Project Generator version', package_json_1.version + '!')} Please start by selecting a project generator below:`);
};
//# sourceMappingURL=plop-init.js.map