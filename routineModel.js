import mongoose from 'mongoose';

const routineSchema = mongoose.Schema({
  routineType: {
    type: String,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  sensitivity: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    required: true,
  },
  makeupFrequency: {
    type: String,
    required: true,
  },
 
  skinConcerns: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});

const Routine = mongoose.model('Routine', routineSchema);

export default Routine;
