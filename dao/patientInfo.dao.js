// patientInfo.dao.js
import mongoose from 'mongoose';

// Use QLDB-specific connection
const qldbConnection = mongoose.connection.useDb('QLDB');

// 2. Define schema for PatientInfo
const patientInfoSchema = new mongoose.Schema({
  Patient: String,
  Age: Number,
  Gender: String,
  Province: String,
  Status: String,
  National: String,
  Date: Date,
  Type: String
}, {collection: 'PatientInfo' });

// 3. Create model (reuse if already compiled)
const PatientInfo = qldbConnection.model('PatientInfo', patientInfoSchema);

// patientInfo.dao.js
export const getPatientSummaryByType = async (type) => {
  const [ageBuckets, genderCounts] = await Promise.all([
    PatientInfo.aggregate([
      { $match: { Type: { $regex: `^${type}$`, $options: 'i' } } },
      {
        $bucket: {
          groupBy: "$Age",
          boundaries: [0, 19, 36, 51, 66],
          default: "65+",
          output: { count: { $sum: 1 } }
        }
      }
    ]),
    PatientInfo.aggregate([
      { $match: { Type: { $regex: `^${type}$`, $options: 'i' } } },
      {
        $group: {
          _id: "$Gender",
          count: { $sum: 1 }
        }
      }
    ])
  ]);

  // Manually map bucket keys to age labels
  const age = {
    "0-18": 0,
    "19-35": 0,
    "36-50": 0,
    "51-65": 0,
    "65+": 0
  };

  for (const bucket of ageBuckets) {
    const k = bucket._id;
    if (k === 0) age["0-18"] = bucket.count;
    else if (k === 19) age["19-35"] = bucket.count;
    else if (k === 36) age["36-50"] = bucket.count;
    else if (k === 51) age["51-65"] = bucket.count;
    else if (k === "65+") age["65+"] = bucket.count;
  }

  // Format gender counts
  const gender = { male: 0, female: 0 };
  for (const g of genderCounts) {
    if (g._id === "Nam") gender.male = g.count;
    else if (g._id === "Nữ") gender.female = g.count;
  }

  return {
    type,
    age,
    gender
  };
};
