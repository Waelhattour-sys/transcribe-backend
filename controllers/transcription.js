const fs = require('fs');
const OpenAI = require('openai');

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: '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', // Ensure the API key is stored in .env
});

// Function to transcribe audio using OpenAI
const transcribeAudio = async (filePath) => {
  try {
    console.log('path:',fs.createReadStream(filePath))
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
    });

    // Return the transcribed text
    return transcription.text;
  } catch (error) {
    console.error('Error during transcription:', error);
    throw new Error('Transcription failed');
  }
};

module.exports = { transcribeAudio };