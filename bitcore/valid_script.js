var bitcore = require('bitcore')
//script = require('bitcore/script')
var fs = require('fs')

var fileName = process.argv[2];

fs.readFile(fileName, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var lines = data.split('\n');
  scriptPubkey = new bitcore.Script(lines[0]);
  tx = bitcore.Transaction(lines[1]);
  nIn = parseInt(lines[2]);
  var verified = bitcore.Script.Interpreter().verify(tx.inputs[nIn].script, scriptPubkey, tx, nIn);
  if (verified) {
      console.log(1);
  } else {
      console.log(0);
  }
});
