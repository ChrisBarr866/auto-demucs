import { proccessArgs, removeTempFiles, createTempDirectory, downloadAudioFilesFromYoutube } from "./lib";

// Get arguments
let args = proccessArgs();

// Create temp directory
createTempDirectory(args);

// Download audio files from youtube
downloadAudioFilesFromYoutube(args);

// Process audio files
processAudioFiles(args);

//Clean up temp files
removeTempFiles(args);

//Print success message
console.log("Process completed successfully.");
