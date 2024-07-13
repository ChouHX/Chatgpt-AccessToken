import type { APIEvent } from "solid-start/api"
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const createSSML = (message: string, voice: string) => `
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
const subscriptionKey = process.env.AZURE_SUBSCRIPTION_KEY;
const serviceRegion = process.env.AZURE_REGION; // e.g., "westus"

// 用于处理 PATCH 请求的函数
export async function POST({ request }: APIEvent) {
    try {
      // 解析请求体
      const body: {
        message?: string;
        voice?: string;
      } = await request.json();
  
      // 从请求体中获取消息和声音选项
      const { message, voice } = body;
  
      // 创建 SSML
      const ssml = createSSML(message, voice);
  
      // 设置语音合成配置
      const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  
      // 合成并播放音频，并等待合成完成
      const audioData = await new Promise<ArrayBuffer>((resolve, reject) => {
        synthesizer.speakSsmlAsync(
          ssml,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              console.log('Synthesis finished.');
              resolve(result.audioData);
            } else {
              console.error(`Speech synthesis canceled: ${result.errorDetails}`);
              reject(new Error('Speech synthesis failed'));
            }
            synthesizer.close();
          },
          (err) => {
            console.trace('Error:', err);
            synthesizer.close();
            reject(err);
          }
        );
      });
  
      // 将 ArrayBuffer 转换为 Uint8Array
      const audioUint8Array = new Uint8Array(audioData);
  
      // 构造响应，将音频作为响应的内容返回
      return new Response(audioUint8Array, {
        headers: {
          'Content-Type': 'audio/mpeg', // 假设这是合成的音频格式
        },
      });
    } catch (error) {
      console.error('Error processing PATCH request:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }