
function getWordFrequency(string, cb) {
  var words = string.split(' ')
    , nrWords = words.length
    , wordFrequency = {}
    , word
    , i
    ;

  for (i = 0; i < nrWords; i++) {
    word = words[i];

    if ( wordFrequency[word] ) {
      wordFrequency[word]++;
    } else {
      wordFrequency[word] = 1;
    }
  }


  cb(null, wordFrequency);
}

exports.getWordFrequency = getWordFrequency;