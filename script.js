// Togglemenu

// const navLinks = document.getElementById('navLinks')
const navMenuLinks = document.getElementById("navMenuLinks");
const biList = document.getElementById("bi-list");

const showMenu = () => {
  if (navMenuLinks.style.display == "none") {
    navMenuLinks.style.display = "block";
    biList.style.display = "none";
  }
};

const hideMenu = () => {
  if (navMenuLinks.style.display == "block") {
    navMenuLinks.style.display = "none";
    biList.style.display = "block";
  }
};


// Form Submission using async/await

const responseData = document.querySelector(".response-data");
const msg = document.querySelector(".msg");
const firstName = document.getElementById("first_name_output");
const lastName = document.getElementById("last_name_output");
const birthDate = document.getElementById("birth_date_output");
const genderOutput = document.getElementById("gender_output");
const emailOutput = document.getElementById("email_output");
const phoneNumberOutput = document.getElementById("phone_number_output");
const desiredCourseOutput = document.getElementById("desired_course_output");


document.querySelector("#form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const inputs = Array.from(form.elements).filter(
    (element) => element.type !== "submit"
  );

  // Different method (does not work 'option' inputs):
  // const inputs = document.querySelectorAll('#form input:not([type="submit"])')
  inputs.forEach((input) => (input.value = ""));

  try {
    const response = await fetch("http://localhost/uni_website/project.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    const successMessage = data.message;
    const userFirstName = data.first_name;
    const userLastName = data.last_name;
    const userBirthDate = data.birth_date;
    const userGender = data.gender;
    const userEmail = data.email;
    const userPhoneNumber = data.phone_number;
    const userDesiredCourse = data.desired_course;

    responseData.style.display = "block";
    msg.innerHTML = `<h3><strong>Success:</strong> ${successMessage} See Your Details Below</h3>`;
    firstName.innerHTML = `<p><strong>First Name:</strong> ${userFirstName}</p>`;
    lastName.innerHTML = `<p><strong>Last Name:</strong> ${userLastName}</p>`;
    birthDate.innerHTML = `<p><strong>Birth Date:</strong> ${userBirthDate}</p>`;
    genderOutput.innerHTML = `<p><strong>Gender:</strong> ${userGender}</p>`;
    emailOutput.innerHTML = `<p><strong>Email:</strong> ${userEmail}</p>`;
    phoneNumberOutput.innerHTML = `<p><strong>Phone Number:</strong> ${userPhoneNumber}</p>`;
    desiredCourseOutput.innerHTML = `<p><strong>Desired Course:</strong> ${userDesiredCourse}</p>`;
  } catch (error) {
    console.log("Error:", error);
  }

  // console.log(data);
});


// Using .then and .catch syntax

// document.querySelector('#form').addEventListener("submit", (event) => {
//   event.preventDefault();

//   const formData = new FormData(form);
//   // const data = Object.fromEntries(formData);
//   // console.log(formData)

//       const inputs = Array.from(form.elements).filter(element => element.type !== 'submit')

//       // Different method:
//       // const inputs = document.querySelectorAll('#form input:not([type="submit"])')

//       inputs.forEach(input => input.value = '');

//   fetch("http://localhost/uni_website/project.php", {
//     method: "POST",
//     body: formData
//   })
//     .then((res) => res.json())
//     .then((data) => {

//       const successMessage = data.message;
//       const userFirstName = data.first_name;
//       const userLastName = data.last_name;
//       const userBirthDate = data.birth_date
//       const userGender = data.gender
//       const userEmail = data.email
//       const userPhoneNumber = data.phone_number
//       const userDesiredCourse = data.desired_course

//       responseData.style.display = "block";
//       msg.innerHTML = `<h3><strong>Success:</strong> ${successMessage} See Your Details Below</h3>`
//       firstName.innerHTML = `<p><strong>First Name:</strong> ${userFirstName}</p>`
//       lastName.innerHTML = `<p><strong>Last Name:</strong> ${userLastName}</p>`
//       birthDate.innerHTML = `<p><strong>Birth Date:</strong> ${userBirthDate}</p>`
//       genderOutput.innerHTML = `<p><strong>Gender:</strong> ${userGender}</p>`
//       emailOutput.innerHTML = `<p><strong>Email:</strong> ${userEmail}</p>`
//       phoneNumberOutput.innerHTML = `<p><strong>Phone Number:</strong> ${userPhoneNumber}</p>`
//       desiredCourseOutput.innerHTML = `<p><strong>Desired Course:</strong> ${userDesiredCourse}</p>`
//     })
//     .catch((error) => console.log('Error:', error));
// });