import PatientInfo from "../../model/patientInfo.model.js";
import { ObjectId } from "mongodb";
// Thêm mới bệnh nhân
const addPatient = async (req, res) => {
  console.log("đang thêm ca mới");
  try {
    const patient = new PatientInfo(req.body);
    await patient.save();
    res.status(201).json({ success: true, data: patient });
  } catch (err) {
    res.status(500).json({ msg: "Lỗi thêm bệnh nhân", error: err.message });
  }
};

// get bệnh nhân, search
const getPatients = async (req, res) => {
  try {
    const { page = 1, searchValue, medicalCondition, typeDisease } = req.query;

    const query = {};

    if (searchValue) {
      const value = searchValue.trim();
      query.Patient = { $regex: value, $options: "i" };
    }

    if (medicalCondition) {
      query.Status = medicalCondition;
    }

    if (typeDisease) {
      query.Type = typeDisease;
    }

    const limit = 20;
    const skip = (page - 1) * limit;

    const total = await PatientInfo.countDocuments(query);
    const patients = await PatientInfo.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: patients,
    });
  } catch (err) {
    res.status(500).json({ msg: "Lỗi truy vấn bệnh nhân", error: err.message });
  }
};

const deletePatientsByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ msg: "Danh sách ID không hợp lệ" });
    }
    const result = await PatientInfo.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
      msg: `Đã xóa ${result.deletedCount} bệnh nhân`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Lỗi khi xóa bệnh nhân", error: err.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { patientId } = req.query;

    if (!patientId) {
      return res.status(400).json({ msg: "Thiếu patientId trong query" });
    }
    const patient = await PatientInfo.findOne({ _id: patientId });

    if (!patient) {
      return res.status(404).json({ msg: "Không tìm thấy bệnh nhân" });
    }
    const updatedPatient = await PatientInfo.findOneAndUpdate(
      { _id: new ObjectId(patientId) },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      msg: "Cập nhật bệnh nhân thành công",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Lỗi khi cập nhật bệnh nhân",
      error: error.message,
    });
  }
};

export { getPatients, addPatient, deletePatientsByIds, updatePatient };
