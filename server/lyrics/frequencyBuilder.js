
function getWordFrequency(string) {
  var words = string.split(' ')
    wordFrequency = countWords(words)
    ;

  return sortWordFrequency(wordFrequency);
}

exports.getWordFrequency = getWordFrequency;

function countWords(words) {
  var nrWords = words.length
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

  return wordFrequency;
}

function sortWordFrequency(wordFrequency) {
  var wordFrequencyArr = []
    , word
    ;

  for (word in wordFrequency) {
    if ( !wordFrequency.hasOwnProperty(word) ) continue;

    wordFrequencyArr.push({
      word: word,
      frequency: wordFrequency[word]
    });
  }

  wordFrequencyArr.sort(function(firstWord, secondWord) {
    return secondWord.frequency - firstWord.frequency;
  });

  return wordFrequencyArr;
}