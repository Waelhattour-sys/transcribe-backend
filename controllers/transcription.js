const fs = require('fs');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const transcribeAudio = async (filePath) => {
  try {
    console.log('path:',fs.createReadStream(filePath))
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
    });

    return transcription.text;
  } catch (error) {
    console.error('Error during transcription:', error);
    throw new Error('Transcription failed');
  }
};

module.exports = { transcribeAudio };