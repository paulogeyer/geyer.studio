
class LangDetect {
  static loadDictionary() {
    return null;
  }

  static isEnglish(message, word_percentage=20, letter_percentage=85) {
    var words_match = get_english_count(message) * 100 >= word_percentage;
    var num_letters = remove_non_letters(message).split('').length;
    var message_letters_percentage = num_letters / message.length * 100;
    var letters_match = message_letters_percentage >= letter_percentage;

    return words_match && letters_match;
  }
}
