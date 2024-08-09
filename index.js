const express = require("express");
const app = express();
const fs = require("fs/promises");
const {
  validateCustomerDate,
  verifyCustomerData,
  addBookingToDB,
  confirmBooking,
  generateAndSendTicketToEmail,
  generatingPaymentLink,
} = require("./utils");

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile("./public/index.html"));

app.get("/flights", async (req, res) => {
  try {
    let flights = await fs.readFile("./flights.json");
    flights = JSON.parse(flights);
    res.json(flights);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

app.get("/flights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let flights = await fs.readFile("./flights.json");
    flights = JSON.parse(flights);

    let flight = flights.find((flight) => flight.id == id);

    res.json(flight);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

app.post(
  "/book",
  validateCustomerDate,
  verifyCustomerData,
  async (req, res) => {
    try {
      //customer date is ok
      const { fullName, email, passportNo, flightId } = req.body;
      let userBooking;
      let userFlight;
      let flights = await fs.readFile("./flights.json");
      flights = JSON.parse(flights);

      flights.map((flight) => {
        if (flight.id === flightId) {
          if (flight.availableSeats) {
            flight.availableSeats -= 1;
            userFlight = flight;
            userBooking = {
              fullName,
              email,
              passportNo,
              flightId,
            };
          }
        }
        return flight;
      });

      if (!userBooking)
        return res
          .status(400)
          .json("this flight dose not have available seats");

      const booking = await addBookingToDB(userBooking);
      let redirectLink = await generatingPaymentLink(booking);

      res.json(redirectLink);
    } catch (error) {
      console.log(error);
      res.status(500).json("server error");
    }
  }
);

app.post("/verify-payment", async (req, res) => {
  //this request is made by payment gateway incase of payment success
  // get the id from request (id is provided in request for payment earlier)

  await confirmBooking("some id");
  await generateAndSendTicketToEmail("some id");
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("server is running");
});
