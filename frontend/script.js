/* =========================================================
FILE: frontend/script.js
INDIA SPARK TALENT SHOW
========================================================= */


// ======================================================
// LOADER
// ======================================================

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.display = "none";
  }

});


// ======================================================
// FORM SUBMIT
// ======================================================

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    // ======================================================
    // GET FORM VALUES
    // ======================================================

    const fullName =
      document.getElementById("fullName").value;

    const age =
      document.getElementById("age").value;

    const gender =
      document.getElementById("gender").value;

    const mobile =
      document.getElementById("mobile").value;

    const whatsapp =
      document.getElementById("whatsapp").value;

    const email =
      document.getElementById("email").value;

    const state =
      document.getElementById("state").value;

    const city =
      document.getElementById("city").value;

    const category =
      document.getElementById("category").value;

    const instagram =
      document.getElementById("instagram").value;

    const socialLink =
      document.getElementById("socialLink").value;

    const about =
      document.getElementById("aboutYourself").value;


    // ======================================================
    // VALIDATIONS
    // ======================================================

    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {

      alert("Mobile number must be 10 digits");

      return;

    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      alert("Enter valid email");

      return;

    }


    // ======================================================
    // CREATE ORDER FROM BACKEND
    // ======================================================

    const orderResponse = await fetch(

      "http://localhost:5000/api/payment/create-order",

      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        }

      }

    );

    const orderData = await orderResponse.json();

    console.log(orderData);


    // ======================================================
    // RAZORPAY OPTIONS
    // ======================================================

    const options = {

      key: "rzp_test_SoWRf6t2dDeXLe",

      amount: orderData.amount,

      currency: orderData.currency,

      order_id: orderData.id,

      name: "INDIA SPARK TALENT SHOW",

      description: "Registration Fee",

      method: {

    upi: true,

    card: true,

    netbanking: true,

    wallet: true

  },


      image: "logo.png",

      handler: async function (response) {

        try {

          // ======================================================
          // SAVE REGISTRATION DATA
          // ======================================================

          const formData = {

            fullName,
            age,
            gender,
            mobile,
            whatsapp,
            email,
            state,
            city,
            category,
            instagram,
            socialLink,
            about,

            paymentId:
              response.razorpay_payment_id

          };

          const saveResponse = await fetch(

            "http://localhost:5000/api/register",

            {

              method: "POST",

              headers: {
                "Content-Type": "application/json"
              },

              body: JSON.stringify(formData)

            }

          );

          const result = await saveResponse.json();

          console.log(result);

          // ======================================================
          // SUCCESS POPUP
          // ======================================================

          document.getElementById(
            "successPopup"
          ).style.display = "flex";

        } catch (error) {

          console.log(error);

          alert("Registration Save Failed");

        }

      },

      prefill: {

        name: fullName,

        email: email,

        contact: mobile

      },

      theme: {

        color: "#d4af37"

      }

    };


    // ======================================================
    // OPEN RAZORPAY
    // ======================================================

    const rzp = new Razorpay(options);

    rzp.open();


    // ======================================================
    // PAYMENT FAILED
    // ======================================================

    rzp.on("payment.failed", function (response) {

      console.log(response);

      alert("Payment Failed");

    });

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }

});


// ======================================================
// CLOSE POPUP
// ======================================================

function closePopup() {

  document.getElementById(
    "successPopup"
  ).style.display = "none";

}