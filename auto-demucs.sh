#!/bin/bash

remove_files() {
    rm -rf $output_path/$project_name/temp
    rm -f $output_path/$project_name/vox.wav
    rm -f $output_path/$project_name/instrumental.wav
    rm -rf $output_path/$project_name
}

#parse input flags
output_path=""
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    --project-name)
    project_name="$2"
    shift # past argument
    ;;
    --vox)
    vox_link="$2"
    shift # past argument
    ;;
    --instrumental)
    instrumental_link="$2"
    shift # past argument
    ;;
    --output-path)
    output_path="$2"
    shift # past argument
    ;;
    *)
    # unknown option
    ;;
esac
shift # past argument or value
done

if [ -z "$output_path" ]; then
    echo -e "\033[31mError: Output path not specified. Use --output-path flag to specify output path.\033[0m"
    exit 1
fi

#create temp directory
mkdir -p $output_path/$project_name/temp/vox
mkdir -p $output_path/$project_name/temp/instrumental

#download audio files from youtube
youtube-dl -x --audio-format mp3 -o "$output_path/$project_name/temp/vox/%(title)s.%(ext)s" $vox_link
if [ $? -ne 0 ]; then
    echo -e "\033[31mError: Failed to download audio file from $vox_link.\033[0m"
    remove_files
    exit 1
fi
youtube-dl -x --audio-format mp3 -o "$output_path/$project_name/temp/instrumental/%(title)s.%(ext)s" $instrumental_link
if [ $? -ne 0 ]; then
    echo -e "\033[31mError: Failed to download audio file from $instrumental_link.\033[0m"
    remove_files
    exit 1
fi

#run demucs on downloaded files
for file in $output_path/$project_name/temp/vox/*.mp3
do
    echo $file # added this line to print the path of the file before passing it to demucs
    demucs --two-stems=vocals "$file"
    if [ $? -ne 0 ]; then
        echo -e "\033[31mError: Failed to separate audio file $file.\033[0m"
        remove_files
        exit 1
    fi
done
for file in $output_path/$project_name/temp/instrumental/*.mp3
do
    echo $file # added this line to print the path of the file before passing it to demucs
    demucs --two-stems=vocals "$file"
    if [ $? -ne 0 ]; then
        echo -e "\033[31mError: Failed to separate audio file $file.\033[0m"
        remove_files
        exit 1
    fi
done

#move and rename separated audio files
vox_file=$(ls $output_path/$project_name/temp/vox/separated/htdemucs/*vocals.wav)
instrumental_file=$(ls $output_path/$project_name/temp/instrumental/separated/htdemucs/*no-vocals.wav)

mv $vox_file $output_path/$project_name/vox.wav
if [ $? -ne 0 ]; then
    echo -e "\033[31mError: Failed to move vox file.\033[0m"
    remove_files
    exit 1
fi
mv $instrumental_file $output_path/$project_name/instrumental.wav
if [ $? -ne 0 ]; then
    echo -e "\033[31mError: Failed to move instrumental file.\033[0m"
    remove_files
    exit 1
fi

#delete temp folder
rm -rf $output_path/$project_name/temp

#print success message
echo -e "\033[32mSuccessfully separated audio files and saved them to $output_path/$project_name/ \033[0m"
