
class LangDetect {
  constructor(msg, ew, word_percentage=20, letter_percentage=85) {
    this.msg = msg;
    this.word_percentage = word_percentage;
    this.letter_percentage = letter_percentage;
    this.UPPER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.LETTERS_AND_SPACE = this.UPPER_LETTERS+this.UPPER_LETTERS.toLowerCase()+' \t\n';
    this.ENGLISH_WORDS = ew;
  }

  get_english_count() {
    var m = this.remove_non_letters(this.msg);
    var possible_words = this.msg.split(' ')
	.map(x => this.remove_non_letters(x).toUpperCase());

    if (possible_words.length == 0)
      return 0.0;

    var matches = 0;

    for(var i = 0; i < possible_words.length; i++)
      if(this.ENGLISH_WORDS[possible_words[i]])
	matches++;
    
    return 1.0*matches/possible_words.length;
  }

  remove_non_letters(msg) {
    var letters_only = [];

    for(var i = 0; i < msg.length; i++)
      if(this.LETTERS_AND_SPACE.includes(msg[i]))
	letters_only.push(msg[i]);

    return letters_only.join('');
  }

  is_english() {
    var num_letters = this.remove_non_letters(this.msg).split('').length;
    var message_letters_percentage = num_letters / this.msg.length * 100;
    var letters_match = message_letters_percentage >= this.letter_percentage;
    if(!letters_match)
      return false;

    var words_match = this.get_english_count(this.msg) * 100 >= this.word_percentage;

    return words_match && letters_match;
  }
}

module.exports = LangDetect;

// var test = new LangDetect("some test text");
// var test1 = new LangDetect("SOME TEST TEXT");
// var test2 = new LangDetect("some more test text to see if this is really working properly");
// console.log(test.is_english());
// console.log(test1.is_english());
// console.log(test2.is_english());
