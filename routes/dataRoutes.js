const express = require('express');
const router = express.Router();
const Data = require('../models/DataModel');

let otpStore = {}; // { otp: '123456', expiresAt: Date }

// ✅ POST - Store data
router.post('/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - Fetch all data
router.get('/data', async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - Generate OTP
router.get('/generate-otp', (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes from now

  otpStore = { otp, expiresAt };
  console.log('Generated OTP:', otp);

  res.json({
    otp,
    expiresIn: '2 minutes'
  });
});

// ✅ GET - Verify OTP
router.get('/verify-otp/:otp', (req, res) => {
  const { otp } = req.params;

  if (!otpStore.otp) {
    return res.status(400).json({ message: 'No OTP generated' });
  }

  if (Date.now() > otpStore.expiresAt) {
    otpStore = {};
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (otpStore.otp === otp) {
    otpStore = {}; // Clear OTP after successful verification
    return res.json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
});


// GET - Personal JSON

router.get('/personal', (req, res) => {
  const personalJSON = {
  1: [
    {
      id: 1,
      title: "First Name",
      placeholder: "Enter first name",
      variable: "firstName",
      type: "textField",
      isDisable: false,
      validations: {
        isRequired: true,
        isRequiredError: "First Name is Required",
        regex: "",
        regexError: "Please enter your first name ",
      },
    },
    {
      id: 2,
      title: "Last Name",
      placeholder: "Enter last name",
      variable: "lastName",
      type: "textField",
      isDisable: false,
      validations: {
        isRequired: true,
        isRequiredError: "Last Name is Required",
        regex: "",
        regexError: "Please enter your last name",
      },
    },
    {
      id: 3,
      title: "Email Address",
      placeholder: "Enter your email",
      variable: "email",
      type: "emailField",
      isDisable: false,
      validations: {
        isRequired: true,
        isRequiredError: "Email is required",
        regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        regexError: "Enter a valid email address",
      },
    },
  ],
  2: [
    {
      id: 1,
      title: "Enter Your PAN Number",
      placeholder: "XXXXX1901X",
      variable: "panNumber",
      type: "textField",
      isDisable: false,
      validations: {
        isRequired: true,
        isRequiredError: "Pan Number is Required",
        regex: "",
        regexError: "Please enter your Pan Number ",
      },
    },
    {
      id: 2,
      title: "Date of Birth",
      placeholder: "Enter DOB",
      variable: "dob",
      type: "dateField",
      isDisable: false,
      validations: {
        isRequired: true,
        isRequiredError: "DOB Field is Required",
        regex: "",
        regexError: "Invalid date format",
      },
    },
    {
      id: 3,
      title: "Select Gender",
      description: "",
      placeholder: "Select Gender",
      variable: "gender",
      type: "radioButton",
      isDisable: false,
      options: [
        { id: 1, label: "Male", value: "male" },
        { id: 2, label: "Female", value: "female" },
        { id: 3, label: "Other", value: "other" },
      ],
      validations: {
        isRequired: true,
        isRequiredError: "Gender is required",
        regex: "",
        regexError: "",
      },
    },
    {
      id: 4,
      title: "Enter PIN CODE",
      placeholder: "400102",
      variable: "pincode",
      type: "textField",
      isDisable: false,
      validations: {
        isRequired: true,
        isRequiredError: "PIN Code is Required",
        regex: "",
        regexError: "Please enter your PIN Code ",
      },
    },
    {
      id: 5,
      title:
        "I acknowledge that my information is secure & will comply with the Terms & Conditions and Privacy Policy.",
      variable: "termsAcceptedPD1",
      type: "checkbox",
      isDisable: false,
      validations: {
        isRequired: true,
        isRequiredError: "You must accept the terms to continue",
      },
    },
    {
      id: 6,
      title:
        "By clicking on proceed, you agree to the Loan App Credit Report Terms of Use, Terms & Conditions and Privacy Policy.",
      variable: "termsAcceptedPD2",
      type: "checkbox",
      isDisable: false,
      validations: {
        isRequired: true,
        isRequiredError: "You must accept the terms to continue",
      },
    },
  ],
};

res.json(personalJSON);
})

// ✅ GET - Requirement JSON
router.get('/requirements', (req, res) => {
  const requirementJSON = {
    1: [
      {
        id: 1,
        title: "Choose a Card Option",
        variable: "cardChoice",
        type: "cardButton",
        isDisable: false,
        options: [
          {
            label: "Personal Loan",
            value: "personal-loan",
            image: "https://example.com/personalloan.png",
            description:
              "Get instant personal loans with minimal documentation and fast approvals.",
          },
          {
            label: "Credit Card",
            value: "credit-card",
            image: "https://example.com/creditcard.png",
            description:
              "Choose the best credit cards with exclusive rewards, offers, and benefits.",
          },
          {
            label: "Home Loan",
            value: "home-loan",
            image: "https://example.com/homeloan.png",
            description:
              "Explore our platform and discover financial solutions tailored to you",
          },
          {
            label: "Business Loan",
            value: "business-loan",
            image: "https://example.com/businessloan.png",
            description:
              "Empower your business with flexible and hassle-free funding options.",
          },
          {
            label: "Car Loan",
            value: "car-loan",
            image: "https://example.com/carloan.png",
            description:
              "Drive your dream car with our easy and affordable car loan plans.",
          },
          {
            label: "Gold Loan",
            value: "gold-loan",
            image: "https://example.com/goldloan.png",
            description:
              "Unlock the value of your gold with secure and quick gold loans.",
          },
        ],
        validations: {
          isRequired: true,
          isRequiredError: "Please select a card option",
        },
      },
    ],
    2: [
      {
        id: 5,
        title: "Select Reason for Your Loan",
        placeholder: "Select Reason",
        variable: "loanReason",
        type: "reactSelect",
        isDisable: false,
        options: [
          { id: 1, label: "Medical Emergency", value: "Medical Emergency" },
          { id: 2, label: "Wedding or Family Function", value: "Wedding or Family Function" },
          { id: 3, label: "Renovate or Repair Home", value: "Renovate or Repair Home" },
          { id: 4, label: "Buy a Gadget or Appliance", value: "Buy a Gadget or Appliance" },
          { id: 5, label: "Travel or Vacation", value: "Travel or Vacation" },
          { id: 6, label: "Home Buying or Renovation", value: "Home Buying or Renovation" },
          { id: 7, label: "Education Expenses", value: "Education Expenses" },
          { id: 8, label: "Debt Consolidation", value: "Debt Consolidation" },
          { id: 9, label: "Business Investment", value: "Business Investment" },
          { id: 10, label: "Vehicle Purchase", value: "Vehicle Purchase" },
          { id: 11, label: "Others", value: "Others" },
        ],
        validations: {
          isRequired: true,
          isRequiredError: "Loan Reason is required",
          regex: "",
          regexError: "",
        },
      },
    ],
  };

  res.json(requirementJSON);
});


module.exports = router;
