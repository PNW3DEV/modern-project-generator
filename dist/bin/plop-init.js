"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMessage = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.initMessage = () => {
    console.info(`${chalk_1.default.green('Welcome to the IGNW Project Generator! Please start by selecting a project generator below:')}`);
};
//# sourceMappingURL=plop-init.js.map