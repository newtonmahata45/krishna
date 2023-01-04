import React from "react";
import "./user.css";

class UserfromData extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    onSubmit(e) {
        e.preventDefault();
    }
    onClick(e) {
        e.preventDefault();
        let firstName = document.querySelector("#firstName").value;
        let lastName = document.querySelector("#lastName").value;
        let country = document.querySelector("#country").value;
        let gender = document.querySelector("#gender").value;
        let email = document.querySelector("#email").value;
        let file = document.querySelector("#file").value;
        if (
            firstName === "" ||
            lastName === "" ||
            gender === "" ||
            email === "" ||
            file === ""
        ) {
            alert("All fields are mandatory");
        }
        console.log(firstName);
        console.log(lastName);
        console.log(country);
        console.log(gender);
        console.log(email);
        console.log(file);
    }

    render() {
        return (
            <div className="UserForm">
                <h1 id="h2">Registration From</h1>
                <div id="container">
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <input
                            id="firstName"
                            type={"text"}
                            placeholder="Enter your firstName"
                        />
                        <br />
                        <input
                            id="lastName"
                            type={"text"}
                            placeholder="Enter your lastName"
                        />
                        <br />
                        <input
                            id="country"
                            type={"text"}
                            placeholder="Enter your country"
                        />
                        <br />
                        <select id="gender">
                            <option>selectGender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <br />
                        <input id="email" type={"email"} placeholder="Enter your e-mail" />
                        <br />
                        <input
                            id="file"
                            type={"file"}
                            placeholder="Enter your profile picture"
                        />
                        <br />
                        <button id="btn" onClick={(e) => this.onClick(e)}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default UserfromData;