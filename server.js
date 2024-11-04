const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const fs = require('fs');
const { transcribeAudio } = require('./controllers/transcription');

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const result = await transcribeAudio(req.file.path);
    //fs.unlinkSync(req.file.path);  
    res.json({ transcript: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
