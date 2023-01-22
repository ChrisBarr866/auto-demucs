# Why does this project exist?

I like to mashup songs by taking the vocals of one song and overlaying it onto the instrumentals of another track [Examples Here]. To achieve this, I have to go through the following steps:

1. Downloading a song to be used as the vocals of our mashup.
2. Downloading a song to be used as the instrumental of our mashup.
3. Using Meta's Demucs tool to separate the vocals from the instrumental.
4. Importing the processsed vocals and instrumental to my preffered DAW(Cubase 10).
5. Beatmatching the vocals and instrumental via Cubase's "Tempo Detection" tool, setting the tracks to musical mode and applyng the measured tempos to it's respective track in the audio pool.
1. 
I like to mashup songs by taking a rap song, isolating the vocals from the background instrumentals via Meta's Demux tool,beatmatching the tempos of the two songs, and overlaying it onto the beat of a different song. While the beat-matching part of this process requires human-intervention, the downloading of tracks and using the Demucs tool to separate the vocals from the original instrumental track can be automated. That is where this script comes in handy.

It uses the following syntax:
"./auto-demucs.sh --vox <youtube-url> --instrumental <youtube-url> --output-path <path-to-file-(default-is-"./") >

The end result should leave you with a folder of the title specified in the --output-path argument. This folder will contain three files, original.mp3, vox.wav, and instrumental.wav.
