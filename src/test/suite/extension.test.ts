import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as mockCodeMap from "../../api/mockCodeMap";
import * as config from "../../config/config";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  test("Random mock filename test", () => {
    assert.strictEqual(10, mockCodeMap.randomFileName(5, ".java").length);
    assert.strictEqual(10, mockCodeMap.randomFileName(7, ".py").length);
  });
  test("Generate mock file test", () => {
    let coupledTo: number[] = [];
    let file = mockCodeMap.generateFile(10, ".java", 0, coupledTo);
    assert.strictEqual(15, file.name.length);
    assert.strictEqual(0, file.id);
    assert.strictEqual(
      true,
      file.goodToBadCommitRatio <= 1 && file.goodToBadCommitRatio >= 0
    );
  });
  test("Generate mock files test", () => {
    let files: mockCodeMap.FileObject[] = mockCodeMap.mockCodeMapGETRequest(
      100,
      ".java"
    );
    assert.strictEqual(100, files.length);
    //let couplingExists = false;
    for (let i = 0; i < files.length; i++) {
      let file: mockCodeMap.FileObject = files[i];
      assert.strictEqual(
        true,
        file.goodToBadCommitRatio <= 1 && file.goodToBadCommitRatio >= 0
      );
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
    } catch {
      assert.fail("setGitUrl await failed");
    }
    assert.strictEqual(config.getGitUrl(), "");
    try {
      await config.setGitUrl("https://www.github.com/my/repository");
    } catch {
      assert.fail("setGitUrl await failed");
    }
    assert.strictEqual(
      config.getGitUrl(),
      "https://www.github.com/my/repository"
    );
  });

  test("Get/set jenkins login preference test", async () => {
    try {
      await config.setJenkinsLogin("");
    } catch {
      assert.fail("setJenkinsLogin await failed");
    }
    assert.strictEqual(config.getJenkinsLogin(), "");
    try {
      await config.setJenkinsLogin("jenkinsbot123");
    } catch {
      assert.fail("setJenkinsLogin await failed");
    }
    assert.strictEqual(
      config.getJenkinsLogin(),
      "jenkinsbot123"
    );
  });

  test("Get/set jenkins password preference test", async () => {
    try {
      await config.setJenkinsPassword("");
    } catch {
      assert.fail("setJenkinsPassword await failed");
    }
    assert.strictEqual(config.getJenkinsPassword(), "");
    try {
      await config.setJenkinsPassword("jenkinsbot123");
    } catch {
      assert.fail("setJenkinsPassword await failed");
    }
    assert.strictEqual(
      config.getJenkinsPassword(),
      "jenkinsbot123"
    );
  });

  test("Get/set jenkins URL preference test", async () => {
    try {
      await config.setJenkinsURL("");
    } catch {
      assert.fail("setJenkinsURL await failed");
    }
    assert.strictEqual(config.getJenkinsURL(), "");
    try {
      await config.setJenkinsURL("https://www.myjenkinsthing.com");
    } catch {
      assert.fail("setJenkinsURL await failed");
    }
    assert.strictEqual(
      config.getJenkinsURL(),
      "https://www.myjenkinsthing.com"
    );
  });
  test("Get/set all jenkins settings test", async () => {
    try {
      await config.setJenkinsURL("");
    } catch {
      assert.fail("setJenkinsURL await failed");
    }
    try {
      await config.setJenkinsLogin("");
    } catch {
      assert.fail("setJenkinsLogin await failed");
    }
    try {
      await config.setJenkinsPassword("");
    } catch {
      assert.fail("setJenkinsPassword await failed");
    }
    let jenkinsSettingsObject = config.getJenkinsSettings();
    assert.strictEqual(jenkinsSettingsObject.login, "");
    assert.strictEqual(jenkinsSettingsObject.password, "");
    assert.strictEqual(jenkinsSettingsObject.url, "");
    try {
      await config.setJenkinsURL("abcdefg.com");
    } catch {
      assert.fail("setJenkinsURL await failed");
    }
    try {
      await config.setJenkinsLogin("beegeesfan1234");
    } catch {
      assert.fail("setJenkinsLogin await failed");
    }
    try {
      await config.setJenkinsPassword("securepassword123");
    } catch {
      assert.fail("setJenkinsPassword await failed");
    }
    jenkinsSettingsObject = config.getJenkinsSettings();
    assert.strictEqual(jenkinsSettingsObject.url, "abcdefg.com");
    assert.strictEqual(jenkinsSettingsObject.login, "beegeesfan1234");
    assert.strictEqual(jenkinsSettingsObject.password, "securepassword123");
  });
});
