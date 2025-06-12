import Location from "../../model/location.model.js";
import People from "../../model/people.model.js";
import mongoose from "mongoose";

export const traceContacts = async (req, res) => {
  const { patientId } = req.params;

  try {
    // 1. Lấy danh sách địa điểm bệnh nhân đã đi qua
    const patientLocations = await Location.find({ userId: patientId });

    const visitedLocations = [];

    for (const loc of patientLocations) {
      // 2. Lấy người khác cũng đi cùng địa điểm (bỏ qua chính bệnh nhân)
      const otherPeople = await Location.find({
        location: loc.location,
        userId: { $ne: new mongoose.Types.ObjectId(patientId) },
      }).populate("userId");

      // 3. Chuẩn bị dữ liệu phản hồi
      const peopleAtLocation = otherPeople.map(entry => ({
        _id: entry.userId._id,
        name: entry.userId.name,
        dob: entry.userId.dob,
        gender: entry.userId.gender,
        phone: entry.userId.phone,
        address: entry.userId.address,
      }));

      visitedLocations.push({
        location: loc.location,
        time: loc.time,
        people: peopleAtLocation,
      });
    }

    res.json({
      patientId,
      visitedLocations,
    });

  } catch (error) {
    console.error("Tracing error:", error);
    res.status(500).json({ error: "Tracing failed" });
  }
};
