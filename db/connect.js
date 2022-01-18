const mongoose=require('mongoose');


const connectDB =(url)=>{
    return mongoose.connect('mongodb+srv://hajarZ:hajar@cluster0.vjfap.mongodb.net/myFirstDatabase', 
    { useNewUrlParser: true }, (err) => {
        if (!err) { console.log('MongoDB Connection Succeeded.') 
        
    }
        else { console.log('Error in DB connection : ' + err) }
    })
};

module.exports=connectDB