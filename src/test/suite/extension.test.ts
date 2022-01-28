import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as mockCodeMap from '../../api/mockCodeMap';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	test('Random filename test', () => {
		assert.strictEqual(10, mockCodeMap.randomFileName(5,".java").length);
		assert.strictEqual(10, mockCodeMap.randomFileName(7,".py").length);
	});
});
