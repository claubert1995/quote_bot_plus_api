from transformers import pipeline
import os
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("HF_TOKEN")
#Model GPT2 trained importation
generator = pipeline(
    
    "text-generation",
    model="Mayko2995/gpt2-quote-fr-v1.1",
    token=token
)

#Function for generate quote
def quote_generator(theme: str):
    result = generator(
    theme,
    max_new_tokens=30,
    temperature=0.8,
    do_sample=True,
    repetition_penalty=2.0,
    no_repeat_ngram_size=3,
    max_length=30
    )
    
    q = result[0]["generated_text"]
    q_split = q.split(".")

    quote = q_split[0]
    quote = quote + "."
    return quote 



    

