import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const subscriptionKey = '6494335ba384490e87dffe63757661db';
const serviceRegion = 'southeastasia'; // e.g., "westus"
const createSSML = (message:string,voice:string) => `
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="zh-CN">
  <voice name="${voice}">
    <mstts:express-as styleDegree="1.5">
      <prosody volume="0%" rate="10%" pitch="0%">
        ${message}
      </prosody>
    </mstts:express-as>
  </voice>
</speak>
`;


export const playAudio = (message:string,voice:string) => {
  const ssml = createSSML(message,voice);
  const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakSsmlAsync(
    ssml,
    (result) => {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log('Synthesis finished.');
      } else {
        console.error(`Speech synthesis canceled: ${result.errorDetails}`);
      }
      synthesizer.close();
    },
    (err) => {
      console.trace('Error:', err);
      synthesizer.close();
    }
  );
  console.log('Now synthesizing...');
};