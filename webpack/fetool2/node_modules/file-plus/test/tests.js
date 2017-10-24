var fps = require("../");
var fs = require("fs");
var assert = require("assert");
describe("mkdirs", function () {
  it("在当前目录异步创建连续文件夹", function (done) {
    fps.mkdirs('./test/aa/bb', 0777, function (e) {
      assert.equal(true, e);
      done();
    })
  });
});

describe("mkdirsSync", function () {
  it("在当前目录同步创建连续文件夹", function () {
    assert.equal(true, fps.mkdirsSync('./test/aa_sync/bb', 0777));
  });
});

describe('createFileSync', function () {
  it('创建文件', function () {
    fps.createFileSync('./test/aa_sync/bb/a.text')
    assert.equal(true, fs.existsSync('./test/aa_sync/bb/a.text'))
    fps.deleteFilesSync('./test/aa_sync/bb', null, null, true)
  })
})

describe("copyFileSync", function () {
  it("拷贝文件", function () {
    fps.copyFileSync('./test/tests.js', './test/copy.js')
    assert.equal(true, fs.existsSync('./test/copy.js'));
    fs.unlinkSync('./test/copy.js')
  });
});

describe("deletedirs", function () {
  it("删除文件", function () {
    fps.deleteFilesSync('./test/aa_sync', null, null, true)
    assert.equal(false, fs.existsSync('./test/aa_sync'));
  });
});

