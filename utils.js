const fs = require("fs/promises");

function validateCustomerDate(req, res, next) {
  const { fullName, email, phoneNumber, passportNo } = req.body;
  if (!fullName) return res.status(400).json("full name is required");
  if (!email) return res.status(400).json("email is required");
  if (!phoneNumber) return res.status(400).json("phone number is required");
  if (!passportNo) return res.status(400).json("passport number is required");

  let phoneNumberPattern = /\+\d{1,3}\s?\d{7,10}/;
  if (!phoneNumberPattern.test(email))
    return res
      .status(400)
      .json(
        "phone number formate must contain Country code: + followed by 1-3 digits and Phone number: 7-10 digits."
      );

  let passportNoPattern = /^[a-zA-Z0-9]{6,9}$/;
  if (!passportNoPattern.test(email))
    return res
      .status(400)
      .json("passport must be from 6 to 9 characters long ");

  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email))
    return res.status(400).json("email must match email@domain.com pattern");

  return next();
}

async function verifyCustomerData(req, res, next) {
  const { fullName, email, passportNo, phoneNumber } = req.body;

  const isPhoneNumberValid = await verifyPhoneNumber(phoneNumber);

  if (!isPhoneNumberValid)
    return res.status(400).json("failed to verify phone number");

  const isEmailValid = await verifyEmail(email);

  if (!isEmailValid) return res.status(400).json("failed to verify email");

  const isPassportValid = await verifyPassportNo(passportNo, fullName);
  if (!isPassportValid)
    return res.status(400).json("failed to verify passport number");

  return next();
}

async function addBookingToDB(newBooking) {
  let bookings = await fs.readFile("./bookings.json");
  bookings = JSON.parse(bookings);
  let booking = {
    ...newBooking,
    status: "PENDING-FOR-PAYMENT",
    id: Math.floor(Math.random() * 10000), // The maximum is exclusive and the minimum is inclusive
  };
  bookings.push();

  await fs.writeFile("./bookings.json", bookings);
  return booking;
}

async function confirmBooking(bookingId) {
  let bookings = await fs.readFile("./bookings.json");
  bookings = JSON.parse(bookings);
  bookings = bookings.map((booking) => {
    if (booking.id == bookingId) {
      booking.status = "PAID";
    }

    return booking;
  });

  await fs.writeFile("./bookings.json", bookings);
  return;
}

async function generateAndSendTicketToEmail(bookingId) {
  // code generating the ticket
  // code sending email

  return;
}

async function generatingPaymentLink(booking) {
  //calculate price and send details to payment gateway
  //provide the user booking id with the request
  // get the redirect link from payment gateway

  return "generatedLink";
}

const verifyPhoneNumber = async (phoneNumber) => {
  // Usage of some external api

  return true;
};

const verifyEmail = async (email) => {
  // Usage of some external api

  return true;
};

const verifyPassportNo = async (passportNo, fullName) => {
  // Usage of some external api
  //check if name of person matches name associated with passport

  return true;
};

module.exports = {
  validateCustomerDate,
  verifyCustomerData,
  addBookingToDB,
  confirmBooking,
  generateAndSendTicketToEmail,
  generatingPaymentLink,
};
