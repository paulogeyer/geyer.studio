
const fs = require('fs');

class LangDetect {
  static load_dictionary() {
    fs.readFile(fname, "utf8", (err, data) => {
      var lines = data.split("\n");
      var res = {};

      for(var i = 0; i < lines.length; i++) {
	res[lines[i]] = null;
      }
    });

    return res;
  }

  static get_english_count(message) {
    var m = this.remove_non_letters(message.toUpperCase());
    var possible_words = m.split(' ');

    if (possible_words.length == 0)
      return 0.0;

    var matches = 0;

    for(var i = 0; i < possible_words.length; i++) {
      if(ENGLISH_WORDS.includes(possible_words[i]))
	matches++;
    }
    
    return 1.0*matches/possible_words.length;
  }

  static remove_non_letters(msg) {
    var letters_only = [];

    for(var i = 0; i < msg.length; i++) {
      if(LETTERS_AND_SPACE.includes(msg[i]))
	letters_only.push(msg[i]);
    }

    return letters_only.join('');
  }

  static isEnglish(message, word_percentage=20, letter_percentage=85) {
    var words_match = get_english_count(message) * 100 >= word_percentage;
    var num_letters = remove_non_letters(message).split('').length;
    var message_letters_percentage = num_letters / message.length * 100;
    var letters_match = message_letters_percentage >= letter_percentage;

    return words_match && letters_match;
  }
}
