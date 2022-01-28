"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const mockCodeMap = require("../../api/mockCodeMap");
// import * as myExtension from '../../extension';
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    test('Random filename test', () => {
        assert.strictEqual(10, mockCodeMap.randomFileName(5, ".java").length);
        assert.strictEqual(10, mockCodeMap.randomFileName(7, ".py").length);
    });
});
//# sourceMappingURL=extension.test.js.map