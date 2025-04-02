# 📦 Word Translation CSV Generator

This Node.js script is used to **generate a CSV file** of English words and their **Polish translations**.  
It is part of the data pipeline for the **Learn English Mobile App**.

## 🚀 What It Does

- Reads an input `.txt` file containing English text.
- Cleans the text and extracts individual English words.
- Automatically translates each word into Polish using the [MyMemory Translation API](https://mymemory.translated.net/).
- Saves the results to a `.csv` file (id, English word, Polish translation).

## ▶️ How to Use

1. **Install dependencies**  
   Make sure you have Node.js installed, then run:

   ```bash
   npm install
   ```

2. Place your input file
   Put your English text into assets/input.txt. The script will read from this file.

3. Run the generator
   Use the following command in the project root directory:
   ```bash
   npm start -- your_output_filename
   ```
   Replace your_output_filename with your desired file name (without .csv).

4. Check the output
   The translated words will be saved in a CSV file located in the output/ directory.
