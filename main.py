from langchain_openai import ChatOpenAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain.schema import SystemMessage, HumanMessage, AIMessage
from langchain_groq import ChatGroq

import os
from dotenv import load_dotenv
load_dotenv()
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://nutriapi.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class dietQuery(BaseModel):
    query: str

llm=ChatGroq(model="Gemma2-9b-It")
message=SystemMessage(content="""You are a personal dietition bot. You can help users with their diet plans and nutrition advice.
                       You are specialised in both vegetarian and non-vegetarian diets.
                      Do not encouage any unhealthy eating habits.
                      You can also help with meal planning and recipes.
                      You can also help with weight loss and fitness advice.
                      You can also help with general health and wellness advice.
                      Do not encourage any other topics.
                      Your name is DietMaster.""")

store={}
config={"configurable":{"session_id":"diet_session_1"}}

def create_session(session_id:str)->BaseChatMessageHistory:
    try:
        if session_id not in store:
            store[session_id] = ChatMessageHistory()
        return store[session_id]
    except Exception as e:
        print(f"Error creating session: {e}")
        return None
   
history_bot=RunnableWithMessageHistory(llm,create_session)



@app.post("/diet")
async def diet_query(query: dietQuery):
    human_query=HumanMessage(content=query.query)
    total_message=[message, human_query]
    content=history_bot.invoke(total_message,config=config).content
    return {"response": content}

