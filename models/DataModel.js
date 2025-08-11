const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  id: Number,
  label: String,
  value: String
}, { _id: false });

// Main schema
const dataSchema = new mongoose.Schema({
  // Required fields
  mobile: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  panNumber: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  pincode: { type: String, required: true },
  termsAcceptedPD1: { type: Boolean, required: true },
  termsAcceptedPD2: { type: Boolean, required: true },
  cardChoice: { type: String, required: true },
  loanReason: { type: optionSchema, required: true },
  selectedAmount: { type: Number, required: true },
  employmentType: { type: String, required: true },

  // -----------------------
  // Optional: Self Business
  businessNature: optionSchema,
  businessType: optionSchema,
  businessAge: optionSchema,

  // -----------------------
  // Optional: Salaried
  bankName: String,
  companyLocation: String,
  companyName: String,
  monthlySalary: String,
  totalWorkExperience: optionSchema,

  // -----------------------
  // Optional: Professional
  professionType: optionSchema,
  professionalExperience: optionSchema,

  // -----------------------
  // Optional: Student
  studentBankName: String,
  passingYear: optionSchema,
  institution: String,
  courseName: String

}, { timestamps: true });

module.exports = mongoose.model('Data', dataSchema);
