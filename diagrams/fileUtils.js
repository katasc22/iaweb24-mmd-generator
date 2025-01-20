import { read, utils } from "xlsx";

export async function handleFileUpload(event) {
  console.log("handleFileUpload:", event);
  const file = event.target.files[0];

  if (!file) {
    throw new Error("No file selected.");
  }

  // Reset previous data and error messages
  const data = await file.arrayBuffer();
  try {
    const workbook = read(data);
    const firstSheetName = workbook.SheetNames[0];
    const sheetData = utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });

    if (sheetData.length === 0) {
      throw new Error("The file appears to be empty.");
    }

    return sheetData; // Return the processed data
  } catch (error) {
    throw new Error(`Error processing file: ${error.message}`);
  }
}
