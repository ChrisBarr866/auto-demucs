import shell from 'shelljs';
import process from 'node:process';
export function proccessArgs() {
    let args = {
        projectName: '',
        voxLink: '',
        instrumentalLink: '',
        outputPath: ''
    };
    console.log("Processing Args");
    process.argv.forEach((arg, i) => {
        if (arg === "--project-name") {
            if (!process.argv[i + 1]) {
                console.error("Error: --project-name argument is missing");
                process.exit(1);
            }
            args.projectName = process.argv[i + 1];
        }
        if (arg === "--vox") {
            if (!process.argv[i + 1]) {
                console.error("Error: --vox argument is missing");
                process.exit(1);
            }
            args.voxLink = process.argv[i + 1];
        }
        if (arg === "--instrumental") {
            if (!process.argv[i + 1]) {
                console.error("Error: --instrumental argument is missing");
                process.exit(1);
            }
            args.instrumentalLink = process.argv[i + 1];
        }
        if (arg === "--output-path") {
            if (!process.argv[i + 1]) {
                console.error("Error: --output-path argument is missing");
                process.exit(1);
            }
            args.outputPath = process.argv[i + 1];
        }
    });
    console.log("Args Processed");
    console.log(args);
    return args;
}
;
export const removeTempFiles = (args) => {
    let outputPath = args.outputPath;
    let projectName = args.projectName;
    shell.rm('-rf', `${outputPath}/${projectName}/temp`);
    shell.rm('-f', `${outputPath}/${projectName}/vox.wav`);
    shell.rm('-f', `${outputPath}/${projectName}/instrumental.wav`);
    shell.rm('-rf', `${outputPath}/${projectName}`);
    console.log("\x1b[32mTemp Files Removed\x1b[0m");
};
export const createTempDirectory = (args) => {
    let outputPath = args.outputPath;
    let projectName = args.projectName;
    shell.mkdir('-p', `./${projectName}/temp/vox`);
    shell.mkdir('-p', `./${projectName}/temp/instrumental`);
    console.log("\x1b[32mTemp Directory Created\x1b[0m");
};
export const downloadAudioFilesFromYoutube = (args) => {
    let outputPath = args.outputPath;
    let projectName = args.projectName;
    let voxLink = args.voxLink;
    let instrumentalLink = args.instrumentalLink;
    console.log("Downloading Audio Files From Youtube using the following args: ");
    console.log(args);
    try {
        shell.exec(`yt-dlp -x --audio-format mp3 -o "${outputPath}/${projectName}/temp/vox/%(title)s.%(ext)s" ${voxLink}`);
    }
    catch (error) {
        console.log(`Error: Failed to download audio file from ${voxLink}`);
        shell.rm('-rf', `${outputPath}/${projectName}`);
        process.exit(1);
    }
    try {
        shell.exec(`yt-dlp -x --audio-format mp3 -o "${outputPath}/${projectName}/temp/instrumental/%(title)s.%(ext)s" ${instrumentalLink}`);
    }
    catch (error) {
        console.log(`Error: Failed to download audio file from ${instrumentalLink}`);
        shell.rm('-rf', `${outputPath}/${projectName}`);
        process.exit(1);
    }
};
