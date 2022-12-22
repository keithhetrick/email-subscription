import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AnimatedCursor from "react-animated-cursor";
import { useParams } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [showAllEmails, setShowAllEmails] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(email);

  const { id } = useParams();

  // CRUD Operations URL
  const DATABASE_URL = "http://localhost:8000/api/emails/";

  // CREATE - POST Request to the database
  const emailButtonSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${DATABASE_URL}`, { email })
      .then((res) => {
        console.log("Success!", res.data.email);
        setEmail(res.data.email);
        setSubscribed(true);
      })
      .catch((err) => {
        // if duplicate email, throw error
        if (err.response.data.code === 11000) {
          setError("Email already subscribed");
          return;
        }
        // if invalid email, throw error
        if (err.response.data.errors.email) {
          console.log(err.response.data.errors.email.properties.message);
          setError(err.response.data.errors.email.properties.message);
          return;
        }
        // if other error, throw error
        console.log(err.response.data.errors.email.message);
        setError(err.response.data.errors.email.message);
      });
  };

  // READ - GET Request emails from the database
  const getAllEmails = () => {
    axios
      .get(`${DATABASE_URL}`)
      .then((res) => {
        console.log(res.data);
        setShowAllEmails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // UPDATE - PUT Request email by id from the database
  const updateEmail = (id) => {
    axios
      .put(`${DATABASE_URL}${id}`, { email })
      .then((res) => {
        console.log(res.data);
        setEmail(res.data.email);
        getAllEmails();
      })
      .catch((err) => {
        // if duplicate email, throw error
        if (err.response.data.code === 11000) {
          setError("Email already subscribed");
          return;
        }
        // if invalid email, throw error
        if (err.response.data.errors?.email) {
          console.log(err.response.data.errors.email.properties.message);
          setError(err.response.data.errors.email.properties.message);
          return;
        }
        // if undefined or null email, throw error
        if (err.response.data.errors?.email === undefined || null) {
          setError("");
          return;
        }
        // if other error, throw error
        console.log(err.response.data.errors?.email.message);
        setError(err.response.data.errors?.email.message);
      });
  };

  // DELETE - DELETE Request email by id from the database
  const deleteEmail = (id) => {
    axios
      .delete(`${DATABASE_URL}${id}`)
      .then((res) => {
        console.log(res.data);
        setEmail(res.data.email);
        getAllEmails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // toggle show all emails
  const toggleShowAllEmails = () => {
    setShowAllEmails((prev) => !prev);
  };

  // "ENTER" key submit
  const enterKeySubmit = (e) => {
    if (e.key === "Enter") {
      emailButtonSubmit(e);
    }
  };

  // reset input field on successful submission
  useEffect(() => {
    if (subscribed) {
      setEmail("");
    }
  }, [subscribed]);

  // reset input field when error message is displayed
  const resetInputFieldRef = useRef();
  useEffect(() => {
    resetInputFieldRef.current.value = "";
  }, [error]);

  // automatically update the list of emails when subscriber is added or deleted
  useEffect(() => {
    if (updateEmail(id) === undefined) updateEmail(id);
  }, [id]);

  // update current email when email is updated
  useEffect(() => {
    setCurrentEmail(email);
  }, [email]);

  return (
    <div>
      <AnimatedCursor />
      <h1 id="title__div">Subscribe to our newsletter</h1>

      {/* if unsubscribed */}
      {!subscribed && (
        <div id="not__subscribed__div">
          <div id="show__subscribers__div">
            {showAllEmails ? (
              <button onClick={toggleShowAllEmails}>
                Hide All Subscribers
              </button>
            ) : (
              <button onClick={getAllEmails}>Show All Subscribers</button>
            )}

            {/* show all subscribers */}
            {showAllEmails &&
              showAllEmails.map((email) => {
                return (
                  <div key={email._id}>
                    <input
                      ref={resetInputFieldRef}
                      type="email"
                      value={email.email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={enterKeySubmit}
                    />
                    <button onClick={() => updateEmail(email._id)}>
                      Edit Email
                    </button>
                    <button onClick={() => deleteEmail(email._id)}>
                      Delete Email
                    </button>
                  </div>
                );
              })}
          </div>

          {/* when edit button is clicked, show updateEmail section to edit state */}
          {showAllEmails && (
            <div id="update__email__div">
              {/* once onClick is submitted, switch from "currentEmail text block to "updated! text" */}

              {currentEmail && (
                <p>
                  Update <span style={{ color: "yellow" }}>{email}</span> to{" "}
                  {currentEmail}?
                </p>
              )}

              <input
                ref={resetInputFieldRef}
                type="email"
                value={currentEmail}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={enterKeySubmit}
              />
              <button onClick={emailButtonSubmit}>Submit</button>
            </div>
          )}

          {/* if unsubscribed & subscribers aren't showing */}
          {!showAllEmails && (
            <input
              ref={resetInputFieldRef}
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={enterKeySubmit}
            />
          )}
          {!showAllEmails && (
            <button onClick={emailButtonSubmit}>Subscribe</button>
          )}

          {/* error message */}
          {error && <p> {error} </p>}
        </div>
      )}

      {/* if subscribed */}
      {subscribed && (
        <div id="subscribed__div">
          <p>
            Thank you for subscribing! Your email{" "}
            <span style={{ color: "blue" }}>{email}</span> has been added to our
            list.
          </p>
          <button onClick={() => setSubscribed(false)}>Go Back</button>
        </div>
      )}
    </div>
  );
}

export default App;
