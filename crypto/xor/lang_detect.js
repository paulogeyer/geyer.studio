
const fs = require('fs');

class LangDetect {
  constructor(msg, word_percentage=20, letter_percentage=85) {
    this.msg = msg;
    this.word_percentage = word_percentage;
    this.letter_percentage = letter_percentage;
    this.UPPER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.LETTERS_AND_SPACE = UPPER_LETTERS+UPPER_LETTERS.toLowerCase()+'\t\n';
    this.ENGLISH_WORDS = this.load_dictionary();
  }

  load_dictionary() {
    fs.readFile(fname, "utf8", (err, data) => {
      var lines = data.split("\n");
      var res = {};

      for(var i = 0; i < lines.length; i++) {
	res[lines[i]] = null;
      }
    });

    return res;
  }

  static get_english_count() {
    var m = this.remove_non_letters(this.msg.toUpperCase());
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

  static is_english() {
    var words_match = get_english_count(this.msg) * 100 >= this.word_percentage;
    var num_letters = remove_non_letters(this.msg).split('').length;
    var message_letters_percentage = num_letters / this.msg.length * 100;
    var letters_match = message_letters_percentage >= this.letter_percentage;

    return words_match && letters_match;
  }
}
