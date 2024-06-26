const axios = require('axios');

const prepareWord = async (word) => {
  let cleanedWord = word.trim();
  cleanedWord = cleanedWord.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/g, '');
  cleanedWord = cleanedWord.toLowerCase();
  return cleanedWord;
};

const translateWord = async (word) => {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|pl`;
  try {
    const response = await axios.get(url);
    const translatedWord = response.data.responseData.translatedText;
    const preparedWord = await prepareWord(translatedWord);
    console.log(`Translated: ${word} To: ${preparedWord}`);
    return preparedWord;
  } catch (error) {
    console.error("Error translating word:", error);
    return null;
  }
};

module.exports = { translateWord };
