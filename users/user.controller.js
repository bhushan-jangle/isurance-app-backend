require("dotenv").config();
const User = require("./user.model");

exports.updateInsuranceDetails = async (req, res) => {
  try {
    const {
      Policy_id,
      Date_of_Purchase,
      Customer_id,
      Fuel,
      VEHICLE_SEGMENT,
      Premium,
      bodily_injury_liability,
      personal_injury_protection,
      property_damage_liability,
      collision,
      comprehensive,
      Customer_Gender,
      Customer_Income_group,
      Customer_Region,
      Customer_Marital_status,
    } = req.body;

    if (
      !Policy_id ||
      !Date_of_Purchase ||
      !Customer_id ||
      !Fuel ||
      !VEHICLE_SEGMENT ||
      !Premium ||
      !bodily_injury_liability ||
      !personal_injury_protection ||
      !property_damage_liability ||
      !collision ||
      !comprehensive ||
      !Customer_Gender ||
      !Customer_Income_group ||
      !Customer_Region ||
      !Customer_Marital_status
    ) {
      return res.status(400).json({
        error: true,
        message:
          "Couldn't process request. Please provide all mandatory fields",
      });
    }

    //1. Find if any account with that email exists in DB
    const user = await User.find({});

    // NOT FOUND - Throw error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found",
      });
    }

    const insuranceDetails = {
      Policy_id,
      Date_of_Purchase,
      Customer_id,
      Fuel,
      VEHICLE_SEGMENT,
      Premium,
      bodily_injury_liability,
      personal_injury_protection,
      property_damage_liability,
      collision,
      comprehensive,
      Customer_Gender,
      Customer_Income_group,
      Customer_Region,
      Customer_Marital_status,
    };

    console.log("user", user[0]);
    console.log("user.insuranceDetails", user[0].insuranceDetails);

    let oldInsuaranceDetails = [...user[0].insuranceDetails];

    const filterInsuaranceDetails = oldInsuaranceDetails.filter(
      (item) => item.Policy_id === Policy_id
    );

    console.log("insuranceDetails", insuranceDetails);
    console.log("oldInsuaranceDetails", oldInsuaranceDetails);
    console.log("filterInsuaranceDetails", filterInsuaranceDetails);

    console.log(
      "user.doctorDetails.indexOf(filterInsuaranceDetails)",
      user[0].insuranceDetails.indexOf(filterInsuaranceDetails[0])
    );

    user[0].insuranceDetails.splice(
      user[0].insuranceDetails.indexOf(filterInsuaranceDetails[0]),
      1,
      insuranceDetails
    );

    console.log("user.doctorDetails", user[0].insuranceDetails);

    // user.doctorDetails = updatedDoctorDetails;
    await user[0].save();

    //Success
    return res.send({
      success: true,
      message: "Insurance details updated!!!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: "Couldn't changed insurance details. Please try again later.",
    });
  }
};

exports.addInsuranceDetails = async (req, res) => {
  console.log("addInsuranceDetails called...");
  try {
    const {
      Policy_id,
      Date_of_Purchase,
      Customer_id,
      Fuel,
      VEHICLE_SEGMENT,
      Premium,
      bodily_injury_liability,
      personal_injury_protection,
      property_damage_liability,
      collision,
      comprehensive,
      Customer_Gender,
      Customer_Income_group,
      Customer_Region,
      Customer_Marital_status,
    } = req.body;

    console.log("addInsuranceDetails called...1");

    if (!Policy_id || !Date_of_Purchase) {
      return res.status(400).json({
        error: true,
        message:
          "Couldn't process request. Please provide all mandatory fields",
      });
    }

    console.log("addInsuranceDetails called...2");

    //create first user at first time

    const insuranceDetails = {
      Policy_id,
      Date_of_Purchase,
      Customer_id,
      Fuel,
      VEHICLE_SEGMENT,
      Premium,
      bodily_injury_liability,
      personal_injury_protection,
      property_damage_liability,
      collision,
      comprehensive,
      Customer_Gender,
      Customer_Income_group,
      Customer_Region,
      Customer_Marital_status,
    };

    //const user = new User();
    // await newUser.save();

    //1. Find if any account with that email exists in DB
    // console.log("addInsuranceDetails called...3", insuranceDetails);
    const user = await User.find({});
    // await user.save();

    console.log("addInsuranceDetails called...3", user[0].insuranceDetails);

    // NOT FOUND - Throw error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found",
      });
    }

    console.log("insuranceDetails", insuranceDetails);

    const updatedInsuranceDetails = [
      ...user[0].insuranceDetails,
      insuranceDetails,
    ];

    user[0].insuranceDetails = updatedInsuranceDetails;
    await user[0].save();

    //Success
    return res.send({
      success: true,
      message: "Insurance details saved successfull",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: "Couldn't save Insurance details. Please try again later.",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    //1. Find if any account with that email exists in DB
    const user = await User.find({});

    // NOT FOUND - Throw error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found",
      });
    }

    //Success
    return res.send({
      success: true,
      message: "User Insurance retrive successfull",
      users: user,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Couldn't retrive details. Please try again later.",
    });
  }
};
