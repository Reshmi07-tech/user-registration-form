// ==========================================
// MINI PROJECT 6 - USER REGISTRATION FORM
// PHASE 2 - ES6 CLASS
// ==========================================

class RegistrationForm {

    constructor(name, email, aadhaar, gender) {
        this.name = name;
        this.email = email;
        this.aadhaar = aadhaar;
        this.gender = gender;
    }


    // ==========================================
    // NAME VALIDATION
    // ==========================================

    validateName() {

        if (this.name.trim() === "") {
            return "Name is required";
        }

        if (this.name.trim().length < 3) {
            return "Name must contain at least 3 characters";
        }

        return "";
    }


    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    validateEmail() {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (this.email.trim() === "") {
            return "Email is required";
        }

        if (!emailPattern.test(this.email)) {
            return "Enter a valid email address";
        }

        return "";
    }


    // ==========================================
    // AADHAAR VALIDATION
    // ==========================================

    validateAadhaar() {

        if (this.aadhaar.trim() === "") {
            return "Aadhaar number is required";
        }

        if (!/^\d{12}$/.test(this.aadhaar)) {
            return "Aadhaar number must contain 12 digits";
        }

        return "";
    }


    // ==========================================
    // GENDER VALIDATION
    // ==========================================

    validateGender() {

        if (this.gender === "") {
            return "Please select your gender";
        }

        return "";
    }


    // ==========================================
    // COMPLETE FORM VALIDATION
    // ==========================================

    validateForm() {

        return {
            name: this.validateName(),
            email: this.validateEmail(),
            aadhaar: this.validateAadhaar(),
            gender: this.validateGender()
        };
    }
}


// ==========================================
// STORE REGISTERED USERS
// ==========================================

let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];


// ==========================================
// GET FORM ELEMENT
// ==========================================

const form =
    document.getElementById("registrationForm");


// ==========================================
// FORM SUBMIT
// ==========================================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get values
    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const aadhaar =
        document.getElementById("aadhaar").value;


    // Get selected gender
    const genderElement =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    const gender =
        genderElement ? genderElement.value : "";


    // Create RegistrationForm object
    const user =
        new RegistrationForm(
            name,
            email,
            aadhaar,
            gender
        );


    // Validate
    const errors =
        user.validateForm();


    // ==========================================
    // DISPLAY ERRORS
    // ==========================================

    document.getElementById("nameError").textContent =
        errors.name;

    document.getElementById("emailError").textContent =
        errors.email;

    document.getElementById("aadhaarError").textContent =
        errors.aadhaar;

    document.getElementById("genderError").textContent =
        errors.gender;


    // ==========================================
    // INPUT STATUS
    // ==========================================

    setInputStatus("name", errors.name);
    setInputStatus("email", errors.email);
    setInputStatus("aadhaar", errors.aadhaar);


    // ==========================================
    // CHECK FORM
    // ==========================================

    const isValid =
        !errors.name &&
        !errors.email &&
        !errors.aadhaar &&
        !errors.gender;


    if (!isValid) {

        document.getElementById("successMessage")
            .textContent = "";

        return;
    }


    // ==========================================
    // ADD USER
    // ==========================================

    users.push(user);

    localStorage.setItem(
    "registeredUsers",
    JSON.stringify(users)
);


    // ==========================================
    // DISPLAY SUCCESS
    // ==========================================

    document.getElementById("successMessage")
        .textContent =
        "Registration is Success";


    // ==========================================
    // DISPLAY USERS
    // ==========================================

    displayUsers(users);


    // ==========================================
    // RESET FORM
    // ==========================================

    form.reset();

    clearInputStatus();

});


// ==========================================
// DISPLAY USERS IN TABLE
// ==========================================

function displayUsers(userList) {

    const tableBody =
        document.getElementById("userTableBody");

    tableBody.innerHTML = "";


    userList.forEach(function (user) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.aadhaar}</td>
            <td>${user.gender}</td>
        `;


        tableBody.appendChild(row);

    });
}


// ==========================================
// INPUT STATUS
// ==========================================

function setInputStatus(inputId, error) {

    const input =
        document.getElementById(inputId);

    input.classList.remove(
        "error",
        "success"
    );


    if (error) {

        input.classList.add("error");

    } else {

        input.classList.add("success");

    }
}


// ==========================================
// CLEAR INPUT STATUS
// ==========================================

function clearInputStatus() {

    const inputs = [
        "name",
        "email",
        "aadhaar"
    ];


    inputs.forEach(function (inputId) {

        document.getElementById(inputId)
            .classList.remove(
                "error",
                "success"
            );

    });

}


// ==========================================
// SEARCH FUNCTION
// ==========================================

document
    .getElementById("searchBtn")
    .addEventListener("click", function () {

        const searchValue =
            document.getElementById("searchInput")
                .value
                .toLowerCase()
                .trim();


        if (searchValue === "") {

            displayUsers(users);

            return;
        }


        const filteredUsers =
            users.filter(function (user) {

                return (
                    user.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    user.email
                        .toLowerCase()
                        .includes(searchValue) ||

                    user.aadhaar
                        .includes(searchValue) ||

                    user.gender
                        .toLowerCase()
                        .includes(searchValue)
                );

            });


        displayUsers(filteredUsers);

        displayUsers(users);

    });