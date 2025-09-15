import { connect } from 'mongoose';

async function connectDB(){
    try {
        await connect(process.env.MONGO_URI)
        console.log('DB Connected Successfully!');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB