// DAO Layer (ESM)

import mongoose from 'mongoose';

// Use QLDB-specific connection
const qldbConnection = mongoose.connection.useDb('QLDB');

const facilitySchema = new mongoose.Schema({
  name: String,
  purpose: String,
  function: String,
  coordinates: [Number],
  location: String,
  province: String
}, { collection: 'HealthcareFacility' });

const HealthcareFacility = qldbConnection.model('HealthcareFacility', facilitySchema);

export const getAllFacilities = async () => {
  return await HealthcareFacility.find({}, {
    _id: 0,
    name: 1,
    purpose: 1,
    function: 1,
    coordinates: 1,
    location: 1,
    province: 1
  }).exec();
};
