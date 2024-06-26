const fs = require('fs');
const { translateWord } = require('./translate');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

// to run this use npm start -- output_filename.csv in project directory

const processFile = async (filePath, outputFileName) => {
  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const words = data.replace(/[^a-zA-Z\s]/g, '').toLowerCase().split(/\s+/);

    // Prepare to write CSV
    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);  // Create the output directory if it doesn't exist
    }

    const csvWriter = createCsvWriter({
      path: path.join(outputDir, outputFileName),  // Path to the CSV file
      header: [
        { id: 'id', title: 'id' },
        { id: 'english_word', title: 'english_word' },
        { id: 'polish_translation', title: 'polish_translation' },
      ]
    });

    const records = [];
    let id = 1;

    for (let word of words) {
      const translation = await translateWord(word);
      if (translation) {
        records.push({ id: id++, english_word: word, polish_translation: translation });
      }
    }

    // Write to CSV file
    csvWriter.writeRecords(records)
      .then(() => {
        console.log(`All words processed and saved to ${outputFileName}.`);
      })
      .catch((err) => {
        console.error("Error writing to CSV:", err);
      });
  });
};

// Get the output file name from command-line arguments
const args = process.argv.slice(2);
const outputFileName = args[0] + '.csv' || 'output.csv';  // Default to 'output.csv' if no argument is provided

processFile('./assets/input.txt', outputFileName);
