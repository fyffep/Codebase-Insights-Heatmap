"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const mockCodeMap = require("../../api/mockCodeMap");
const config = require("../../config/config");
// import * as myExtension from '../../extension';
suite("Extension Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");
    test("Random mock filename test", () => {
        assert.strictEqual(10, mockCodeMap.randomFileName(5, ".java").length);
        assert.strictEqual(10, mockCodeMap.randomFileName(7, ".py").length);
    });
    test("Generate mock file test", () => {
        let coupledTo = [];
        let file = mockCodeMap.generateFile(10, ".java", 0, coupledTo);
        assert.strictEqual(15, file.name.length);
        assert.strictEqual(0, file.id);
        assert.strictEqual(true, file.goodToBadCommitRatio <= 1 && file.goodToBadCommitRatio >= 0);
    });
    test("Generate mock files test", () => {
        let files = mockCodeMap.mockCodeMapGETRequest(100, ".java");
        assert.strictEqual(100, files.length);
        //let couplingExists = false;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            assert.strictEqual(true, file.goodToBadCommitRatio <= 1 && file.goodToBadCommitRatio >= 0);
            //let coupledTo: number[] = file.coupledTo;
            //if (coupledTo.length > 0) {
            //couplingExists = true;
            //}
        }
        //assert.strictEqual(true, couplingExists);
    });
    test("Get/set github URL preference test", async () => {
        try {
            await config.setGitUrl("");
        }
        catch {
            assert.fail("setGitUrl await failed");
        }
        assert.strictEqual(config.getGitUrl(), "");
        try {
            await config.setGitUrl("https://www.github.com/my/repository");
        }
        catch {
            assert.fail("setGitUrl await failed");
        }
        assert.strictEqual(config.getGitUrl(), "https://www.github.com/my/repository");
    });
    test("Get/set jenkins login preference test", async () => {
        try {
            await config.setJenkinsLogin("");
        }
        catch {
            assert.fail("setJenkinsLogin await failed");
        }
        assert.strictEqual(config.getJenkinsLogin(), "");
        try {
            await config.setJenkinsLogin("jenkinsbot123");
        }
        catch {
            assert.fail("setJenkinsLogin await failed");
        }
        assert.strictEqual(config.getJenkinsLogin(), "jenkinsbot123");
    });
});
//# sourceMappingURL=extension.test.js.map