# AI Memory System: Short-Term vs Long-Term

## 1. Short-Term Memory (MongoDB)
- Stores **recent chats** only.  
- Example: last 10–20 user & AI messages.  
- Fast to access → used for immediate conversation context.  
- Works just like a human’s *working memory*.  

---

## 2. Long-Term Memory (Pinecone / Vector DB)
- Stores **all past conversations** in vector format.  
- Optimized for **semantic search** (similar meaning search).  
- Works like a human’s *long-term memory bank*.  

---

## 3. Flow of Answer Retrieval
1. **Check Short-Term Memory first**  
   - If the recent conversation already has the answer → use it.  
   - `queryMemory()` is **not called**.  

2. **If not found in Short-Term Memory**  
   - Then `queryMemory()` is triggered.  
   - Pinecone (vector DB) is searched for relevant past context.  
   - The retrieved memory is added to AI’s input before generating a reply.  

---

## 4. Analogy with Human Brain 🧠
- **Short-Term Memory** → “What we just talked about”  
- **Long-Term Memory** → “Something we discussed weeks ago”  
- Process:  
  - If I remember it right now → answer immediately.  
  - If not, I recall from deep memory.  

---

## 6. Key Point
✅ **If the answer is found in Short-Term Memory → no need to call Pinecone.**  
❌ Only when Short-Term Memory fails → `queryMemory()` searches Long-Term Memory.  
