const sheets = require("../config/googleSheets");

const transporter = require("../config/nodemailer");

const generateContestantId = require(
  "../utils/contestantIdGenerator"
);

require("dotenv").config();


// ======================================
// REGISTER CONTESTANT
// ======================================

exports.registerContestant = async (req, res) => {

  try {

    // Get form data
    const data = req.body;

    // ==========================
    // VALIDATION
    // ==========================

    if (
      !data.fullName ||
      !data.email ||
      !data.mobile ||
      !data.category
    ) {

      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });

    }

    // ==========================
    // GENERATE CONTESTANT ID
    // ==========================

    const contestantId =
      generateContestantId(data.category);

    // ==========================
    // SAVE TO GOOGLE SHEETS
    // ==========================

    await sheets.spreadsheets.values.append({

      spreadsheetId: process.env.GOOGLE_SHEET_ID,

      range: "Sheet1!A1",

      valueInputOption: "RAW",

      resource: {

        values: [[

          contestantId,
          data.fullName,
          data.age,
          data.gender,
          data.mobile,
          data.whatsapp,
          data.email,
          data.state,
          data.city,
          data.category,
          data.instagram,
          data.socialLink,
          data.about,
          data.paymentId,
          "Paid",
          new Date().toLocaleString()

        ]]
      }
    });

    // ==========================
    // SEND EMAIL
    // ==========================

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: data.email,

      subject:
        "INDIA SPARK TALENT SHOW Registration",

      html: `

        <h2>INDIA SPARK TALENT SHOW</h2>

        <p>Hello ${data.fullName}</p>

        <p>
          Your registration completed successfully.
        </p>

        <p>
          <strong>Contestant ID:</strong>
          ${contestantId}
        </p>

        <p>
          <strong>Category:</strong>
          ${data.category}
        </p>

        <p>
          <strong>Payment Status:</strong>
          Paid
        </p>

      `
    });

    // ==========================
    // SUCCESS RESPONSE
    // ==========================

    res.status(200).json({

      success: true,

      contestantId,

      message: "Registration Successful"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

}; 