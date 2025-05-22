import Routine from '../models/routineModel.js';
import Product from '../models/productModel.js';

// ✅ Create a new routine
export const createRoutine = async (req, res) => {
  try {
    console.log("✅ Received routine data:", req.body);
    const routine = await Routine.create(req.body);
    res.status(201).json(routine);
  } catch (error) {
    console.error("❌ Routine create error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get personalized product recommendations based on a routine
export const getRoutineRecommendations = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    // ✅ Handle "Mixed" budget by using all ranges
    const priceRangeFilter = routine.budget === 'Mixed'
      ? ['Budget-Friendly', 'Moderate', 'Premium']
      : [routine.budget];

    // 🧠 Build product match query
    const query = {
      routine_type: { $in: [routine.routineType, 'Both'] },
      price_range: { $in: priceRangeFilter },
      sensitivity_level: routine.sensitivity,
      environment: { $in: [routine.environment, 'All'] },
      makeup_frequency: { $in: [routine.makeupFrequency] }, // ensure array match
      concerns: { $in: routine.skinConcerns },
    };

    const matchedProducts = await Product.find(query).limit(10);

    res.json({
      products: matchedProducts,
      routineData: routine,
    });
  } catch (error) {
    console.error("❌ Recommendation error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
