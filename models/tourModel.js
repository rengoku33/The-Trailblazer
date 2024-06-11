const mongoose = require("mongoose");

// creating schema
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true
    }, 
    rating: {
      type: Number,
      default: 4.4
    }, 
    price: Number 
  })
  
  // creating model
  const Tour = mongoose.model('Tour', tourSchema);
  

module.exports = Tour;