"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserValidator = void 0;
var ParserValidator = /** @class */ (function () {
    function ParserValidator() {
    }
    ParserValidator.prototype.validateTestsNumber = function () {
        if (isNaN(this.testsHandler.testsNumber) || (this.testsHandler.testsNumber > 1000 || this.testsHandler.testsNumber < 1)) {
            this.readInterface.write('STOP HERE\n');
            this.readInterface.close();
        }
        return this.data.length === this.n;
    };
    return ParserValidator;
}());
exports.ParserValidator = ParserValidator;
