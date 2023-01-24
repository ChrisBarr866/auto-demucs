import { proccessArgs, removeTempFiles, createTempDirectory, downloadAudioFilesFromYoutube } from "./lib.js";
// Get arguments from the command line
let args = proccessArgs();
// Create temp directory
createTempDirectory(args);
// Download audio files from youtube
downloadAudioFilesFromYoutube(args);
// // Process audio files
// processAudioFiles(args);
//Clean up temp files
removeTempFiles(args);
//Print success message
console.log("\x1b[32mProcess Completed Successfully\x1b[0m");
