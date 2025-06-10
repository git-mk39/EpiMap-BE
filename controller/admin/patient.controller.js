import PatientInfo from "../../model/patientInfo.model.js";

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

// Lấy danh sách bệnh nhân, có lọc
const getPatients = async (req, res) => {
  try {
    const { page = 1, searchValue, medicalCondition, typeDisease } = req.query;

    const query = {};

    if (searchValue) {
      const value = searchValue.trim();
      if (!isNaN(value)) {
        // Nếu là số → tìm theo PatientId
        query.PatientId = Number(value);
      } else {
        // Nếu là chữ → tìm theo tên (Patient)
        query.Patient = { $regex: value, $options: "i" };
      }
    }

    if (medicalCondition) {
      query.Status = medicalCondition;
    }

    if (typeDisease) {
      query.Type = typeDisease;
    }

    const limit = 15;
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

export { getPatients, addPatient };
