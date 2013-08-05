/**
 * Counts word frequncy from string passed in and returns the result
 * @param  {String} string The text we want to get word frequency from
 * @return {Array}        Sorted (desc) array containing objects like { word: "problems", frequency: 99 }
 */
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