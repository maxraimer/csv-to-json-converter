import fs from 'fs';
import csv from 'csv-parser';

export const csvToJson = (csvFilePath, jsonFilePath) => {
    /**
     * Convert a CSV file to a JSON file.
     *
     * @param csvFilePath: Path to the input CSV file
     * @param jsonFilePath: Path to the output JSON file
     */
    const rows = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => rows.push(data))
        .on('end', () => {
            fs.writeFile(jsonFilePath, JSON.stringify(rows, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error(`An error occurred: ${err}`);
                } else {
                    console.log(`CSV file has been successfully converted to JSON and saved to ${jsonFilePath}.`);
                }
            });
        })
        .on('error', (err) => {
            console.error(`An error occurred: ${err}`);
        });
};
