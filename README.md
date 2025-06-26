# 🥗 NutriBot AI - Your Personal Nutrition Expert

![NutriBot AI](https://img.shields.io/badge/NutriBot-AI%20Powered-brightgreen?style=for-the-badge&logo=robot)
![Status](https://img.shields.io/badge/Status-Active%20Development-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🌟 Overview

**NutriBot AI** is an intelligent nutrition chatbot that serves as your personal AI dietitian. Built with modern web technologies and powered by OpenAI, NutriBot provides personalized nutrition advice, meal planning, and dietary recommendations to help you achieve your health goals.

## ✨ Features

### 🤖 **AI-Powered Chat Interface** *(Currently Active)*
- Real-time conversations with your personal AI dietitian  
- Personalized nutrition advice based on your queries  
- Support for both vegetarian and non-vegetarian diets  
- Memory of conversation context for better recommendations  
- Quick suggestion prompts for common nutrition questions  
- Interactive like/dislike feedback system  

### 🎯 **Planned Features** *(Coming Soon)*
- **📊 Meal Analysis** - Analyze nutritional content of your meals  
- **🔢 Calorie Counter** - Track your daily caloric intake  
- **🎯 Goal Setting** - Set and track your nutrition goals  
- **📈 Progress Tracking** - Monitor your health journey  
- **📅 Weekly Meal Planning** - Get customized meal plans  
- **🥩 Protein Requirements** - Calculate your protein needs  
- **🍳 Healthy Breakfast Ideas** - Start your day right  
- **⚖️ Weight Loss Strategy** - Personalized weight management  

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript  
- **Next.js** for the web framework  
- **Tailwind CSS** for styling  
- **shadcn/ui** for UI components  
- **Lucide React** for icons  

### Backend
- **FastAPI** for the REST API  
- **LangChain** for AI orchestration  
- **Groq** for AI responses  
- **Python** as the backend language  

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)  
- Python (v3.8 or higher)  
- OpenAI API Key  

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nutribot-ai.git
   cd nutribot-ai
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   ```bash
   # Create .env file
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

5. **Run the FastAPI server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend  # or wherever your React app is located
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

1. **Start a Conversation**: Simply type your nutrition-related questions in the chat interface  
2. **Get Personalized Advice**: Ask about meal planning, dietary recommendations, or health goals  
3. **Use Quick Suggestions**: Click on the suggested prompts for common questions  
4. **Provide Feedback**: Use the like/dislike buttons to help improve responses  

### Example Queries:
- "Plan a healthy meal for today"  
- "Calculate my daily calorie needs"  
- "Suggest protein-rich breakfast options"  
- "Help me with a weight loss diet plan"  
- "What are good vegetarian protein sources?"  
