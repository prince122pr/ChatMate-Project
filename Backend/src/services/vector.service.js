// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const chatMateIdx = pc.Index('chat-mate-project');

export async function createMemory({vectors, metadata, messageId}) {
    await chatMateIdx.upsert([
        {
            id: messageId,
            values: vectors,
            metadata
        }
    ])
}

export async function queryMemory({queryVector, limit=5 ,metadata}) {
    const data = await chatMateIdx.query({
        vector: queryVector,
        topK: limit,
        filter: metadata?metadata:undefined,
        includeMetadata: true
    })
    return data.matches
}

