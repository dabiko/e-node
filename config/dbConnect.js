const { default: mongoose } = require('mongoose');

const dbConnect = () => {
    try{
        const connection = mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected successfully');
    }catch (error){
        throw new Error(`Database error ` + error);
    }
}
module.exports=dbConnect;
