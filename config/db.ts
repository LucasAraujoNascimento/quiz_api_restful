import mongoose from 'mongoose';
import config from 'config'

async function connect(){
    const dbUri = config.get<string>('dbUri')
    try {
        await mongoose.connect(dbUri)
        console.log('Database running');
    } catch (e: any) {
        console.log(`Error: ${e.message}`)
    }
}

export default connect