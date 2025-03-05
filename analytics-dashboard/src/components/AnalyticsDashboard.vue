<template>
    <div class="sentiment-app" :class="{ 'dark-mode': isDarkMode }">
      <div class="card">
        <h1 class="title">Sentiment Analysis</h1>
        <textarea
          v-model="inputText"
          placeholder="Enter your text here..."
          class="input-text"
        ></textarea>
        <button @click="analyzeSentiment" :disabled="isLoading" class="analyze-button">
          {{ isLoading ? '⏳ Analyzing...' : '🔍 Analyze Sentiment' }}
        </button>
        <div v-if="sentimentResult" class="result-card" :class="sentimentClass">
          <h2 class="result-title">Result:</h2>
          <p class="result-text">
            {{ sentimentResult }}
            <span v-if="sentimentClass === 'positive'">😊</span>
            <span v-else-if="sentimentClass === 'negative'">😞</span>
            <span v-else>😐</span>
          </p>
        </div>
      </div>
      <button @click="toggleDarkMode" class="dark-mode-toggle">
        {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        inputText: '',
        sentimentResult: '',
        sentimentClass: '', // New data property for class binding
        isLoading: false,
        isDarkMode: false,
      };
    },
    methods: {
      async analyzeSentiment() {
        if (!this.inputText.trim()) {
          alert('Please enter some text.');
          return;
        }
  
        this.isLoading = true;
        this.sentimentResult = '';
        this.sentimentClass = '';
  
        try {
          const apiUrl = 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';
          const headers = {
            Authorization: `Bearer your token`,
          };
  
          const response = await axios.post(
            apiUrl,
            { inputs: this.inputText },
            { headers }
          );
  
          const sentiment = response.data[0][0].label;
          this.sentimentClass = sentiment.toLowerCase(); // Set class directly
          this.sentimentResult = `Sentiment: ${sentiment}`;
          
        } catch (error) {
          console.error('Error analyzing sentiment:', error);
          this.sentimentResult = 'Failed to analyze sentiment. 😟';
          this.sentimentClass = 'error';
        } finally {
          this.isLoading = false;
        }
      },
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
      },
    },
  };
  </script>
  
  <style scoped>
 /* Main Container */
 .sentiment-app {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 20px;
    transition: background 0.3s ease;
  }
  
  .sentiment-app.dark-mode {
    background: linear-gradient(135deg, #2c3e50, #34495e);
  }
  
  /* Card */
  .card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 30px;
    max-width: 500px;
    width: 100%;
    text-align: center;
    transition: background 0.3s ease, color 0.3s ease;
  }
  
  .dark-mode .card {
    background: rgba(40, 40, 40, 0.9);
    color: #fff;
  }
  
  /* Title */
  .title {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    transition: color 0.3s ease;
  }
  
  .dark-mode .title {
    color: #fff;
  }
  
  /* Textarea */
  .input-text {
    width: 100%;
    height: 150px;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 16px;
    resize: none;
    margin-bottom: 20px;
    transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
  }
  
  .input-text:focus {
    border-color: #667eea;
    outline: none;
  }
  
  .dark-mode .input-text {
    background: #333;
    border-color: #555;
    color: #fff;
  }
  
  /* Analyze Button */
  .analyze-button {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  }
  
  .analyze-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  .analyze-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .dark-mode .analyze-button {
    background: linear-gradient(135deg, #34495e, #2c3e50);
  }
  
  /* Result Card */
  .result-card {
    margin-top: 25px;
    padding: 20px;
    border-radius: 10px;
    text-align: left;
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  
  .result-card.positive {
    background: #e8f5e9; /* Light green */
    border-left: 5px solid #4caf50; /* Green */
  }
  
  .result-card.negative {
    background: #ffebee; /* Light red */
    border-left: 5px solid #f44336; /* Red */
  }
  
  .result-card.neutral {
    background: #fff3e0; /* Light yellow */
    border-left: 5px solid #ff9800; /* Orange */
  }
  
  .dark-mode .result-card {
    background: rgba(255, 255, 255, 0.1);
    border-left: 5px solid #667eea;
  }
  
  .result-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    transition: color 0.3s ease;
  }
  
  .dark-mode .result-title {
    color: #fff;
  }
  
  .result-text {
    font-size: 18px;
    color: #555;
    transition: color 0.3s ease;
  }
  
  .dark-mode .result-text {
    color: #ddd;
  }
  
  /* Dark Mode Toggle Button */
  .dark-mode-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .dark-mode-toggle:hover {
    background: #764ba2;
  }
  
  .dark-mode .dark-mode-toggle {
    background: #34495e;
  }
  
  .result-text {
    font-size: 18px;
    color: #555;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.3s ease;
  }
  
  /* Add animation for emojis */
  .result-text span {
    font-size: 24px;
    animation: popIn 0.3s ease;
  }
  
  @keyframes popIn {
    0% { transform: scale(0); }
    90% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  </style>