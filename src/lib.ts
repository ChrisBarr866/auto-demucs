import { execSync } from "child_process";

interface Args {
  projectName: string;
  voxLink: string;
  instrumentalLink: string;
  outputPath: string;
}

export function proccessArgs(): Args {
  let args: Args = {
    projectName: '',
    voxLink: '',
    instrumentalLink: '',
    outputPath: ''
  }
  process.argv.forEach((arg, i) => {
    if (arg === "--project-name") {
      if(!process.argv[i + 1]){
        console.error("Error: --project-name argument is missing");
        process.exit(1);
      }
      args.projectName = process.argv[i + 1];
    }
    if (arg === "--vox") {
      if(!process.argv[i + 1]){
        console.error("Error: --vox argument is missing");
        process.exit(1);
      }
      args.voxLink = process.argv[i + 1];
    }
    if (arg === "--instrumental") {
      if(!process.argv[i + 1]){
        console.error("Error: --instrumental argument is missing");
        process.exit(1);
      }
      args.instrumentalLink = process.argv[i + 1];
    }
    if (arg === "--output-path") {
      if(!process.argv[i + 1]){
        console.error("Error: --output-path argument is missing");
        process.exit(1);
      }
      args.outputPath = process.argv[i + 1];
    }
  });
  return args;
};

export const removeTempFiles = (args: Args) => {
  let outputPath = args.outputPath;
  let projectName = args.projectName;
  execSync(`rm -rf ${outputPath}/${projectName}/temp`);
  execSync(`rm -f ${outputPath}/${projectName}/vox.wav`);
  execSync(`rm -f ${outputPath}/${projectName}/instrumental.wav`);
  execSync(`rm -rf ${outputPath}/${projectName}`);
};

export const createTempDirectory = (args: Args) => {
  execSync(`mkdir -p ${args.outputPath}/${args.projectName}/temp/vox`);
  execSync(`mkdir -p ${args.outputPath}/${args.projectName}/temp/instrumental`);
};

export const downloadAudioFilesFromYoutube = () => {
  try {
    execSync(
      `youtube-dl -x --audio-format mp3 -o "${outputPath}/${projectName}/temp/vox/%(title)s.%(ext)s" ${voxLink}`
    );
  } catch (error) {
    console.log(`Error: Failed to download audio file from ${voxLink}`);
    removeFiles(outputPath, projectName);
    process.exit(1);
  }

  try {
    execSync(
      `youtube-dl -x --audio-format mp3 -o "${outputPath}/${projectName}/temp/instrumental/%(title)s.%(ext)s" ${instrumentalLink}`
    );
  } catch (error) {
    console.log(
      `Error: Failed to download audio file from ${instrumentalLink}`
    );
    removeFiles(outputPath, projectName);
    process.exit(1);
  }
};
