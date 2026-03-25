from sqlmodel import SQLModel

#Model 
class QuotePrompt(SQLModel):
    theme: str
    author: str | None = None