import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as mockCodeMap from '../../api/mockCodeMap';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	test('Random mock filename test', () => {
		assert.strictEqual(10, mockCodeMap.randomFileName(5,".java").length);
		assert.strictEqual(10, mockCodeMap.randomFileName(7,".py").length);
	});
	test('Generate mock file test', () => {
		let coupledTo: number[] = [];
		let file = mockCodeMap.generateFile(10,".java",0,coupledTo);
		assert.strictEqual(15,file.name.length);
		assert.strictEqual(0, file.id);
	});
});
