const { execSync } = require('child_process');

const removeFiles = (outputPath, projectName) => {
    execSync(`rm -rf ${outputPath}/${projectName}/temp`);
    execSync(`rm -f ${outputPath}/${projectName}/vox.wav`);
    execSync(`rm -f ${outputPath}/${projectName}/instrumental.wav`);
    execSync(`rm -rf ${outputPath}/${projectName}`);
}

//parse input flags
let outputPath = "";
let projectName = "";
let voxLink = "";
let instrumentalLink = "";

for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === "--project-name") {
        projectName = process.argv[i + 1];
    }
    if (process.argv[i] === "--vox") {
        voxLink = process.argv[i + 1];
    }
    if (process.argv[i] === "--instrumental") {
        instrumentalLink = process.argv[i + 1];
    }
    if (process.argv[i] === "--output-path") {
        outputPath = process.argv[i + 1];
    }
}

if (!outputPath) {
    console.log("Error: Output path not specified. Use --output-path flag to specify output path.")
    process.exit(1);
}

//create temp directory
execSync(`mkdir -p ${outputPath}/${projectName}/temp/vox`);
execSync(`mkdir -p ${outputPath}/${projectName}/temp/instrumental`);

//download audio files from youtube
try {
    execSync(`youtube-dl -x --audio-format mp3 -o "${outputPath}/${projectName}/temp/vox/%(title)s.%(ext)s" ${voxLink}`);
} catch (error) {
    console.log(`Error: Failed to download audio file from ${voxLink}`);
    removeFiles(outputPath, projectName);
    process.exit(1);
}

try {
    execSync(`youtube-dl -x --audio-format mp3 -o "${outputPath}/${projectName}/temp/instrumental/%(title)s.%(ext)s" ${instrumentalLink}`);
} catch (error) {
    console.log(`Error: Failed to download audio file from ${instrumentalLink}`);
    removeFiles(outputPath, projectName);
    process.exit(1);
}

//run demucs on downloaded files
const voxFiles = execSync(`ls ${outputPath}/${projectName}/temp/vox/*.mp3`).toString();
const instrumentalFiles = execSync(`ls ${outputPath}/${projectName}/temp/instrumental/*.mp3`).toString();

voxFiles.split("\n").forEach(file => {
    if (!file) return;
    console.log(file);
    try
    {
        execSync(demucs --two-stems=vocals "${file}");
        } catch (error) {
        console.log(Error: Failed to separate audio file ${file});
        removeFiles(outputPath, projectName);
        process.exit(1);
        }
        });
        
        instrumentalFiles.split("\n").forEach(file => {
        if (!file) return;
        console.log(file);
        try {
        execSync(demucs --two-stems=vocals "${file}");
        } catch (error) {
        console.log(Error: Failed to separate audio file ${file});
        removeFiles(outputPath, projectName);
        process.exit(1);
        }
        });
        
        //move and rename separated audio files
        let voxFile = "";
        let instrumentalFile = "";
        
        try {
        voxFile = execSync(ls ${outputPath}/${projectName}/temp/vox/separated/htdemucs/\*vocals.wav).toString();
        } catch (error) {
        console.log("Error: Failed to find vox file.");
        removeFiles(outputPath, projectName);
        process.exit(1);
        }
        
        try {
        instrumentalFile = execSync(ls ${outputPath}/${projectName}/temp/instrumental/separated/htdemucs/*no-vocals.wav).toString();
        } catch (error) {
        console.log("Error: Failed to find instrumental file.");
        removeFiles(outputPath, projectName);
        process.exit(1);
        }
        
        try {
        execSync(mv ${voxFile} ${outputPath}/${projectName}/vox.wav);
        } catch (error) {
        console.log("Error: Failed to move vox file.");
        removeFiles(outputPath, projectName);
        process.exit(1);
        }
        
        try {
        execSync(mv ${instrumentalFile} ${outputPath}/${projectName}/instrumental.wav);
        } catch (error) {
        console.log("Error: Failed to move instrumental file.");
        removeFiles(outputPath, projectName);
        process.exit(1);
        }
        
        //delete temp folder
        removeFiles(outputPath, projectName);
        console.log("Process completed successfully.");