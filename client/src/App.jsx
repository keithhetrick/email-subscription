import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AnimatedCursor from "react-animated-cursor";

function App() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [showAllEmails, setShowAllEmails] = useState(false);

  // CRUD Operations URL
  const DATABASE_URL = "http://localhost:8000/api/emails/";

  // POST Request to the database on submit
  const emailButtonSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${DATABASE_URL}`, { email })
      .then((res) => {
        console.log(res.data.email);
        setEmail(res.data.email);
        setSubscribed(true);
      })
      .catch((err) => {
        console.log(err.response.data.errors.email.message);
        setError(err.response.data.errors.email.message);
      });
  };

  // GET Request emails from the database on click
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

  // toggle
  const toggleShowAllEmails = () => {
    setShowAllEmails((prev) => !prev);
  };

  // "ENTER" key submit the form
  const enterKeySubmit = (e) => {
    if (e.key === "Enter") {
      emailButtonSubmit(e);
    }
  };

  // reset input field when error message is displayed
  const resetInputFieldRef = useRef();
  useEffect(() => {
    resetInputFieldRef.current.value = "";
  }, [error]);

  return (
    <div>
      <AnimatedCursor />
      <h1>Subscribe to our newsletter</h1>

      {/* buttons */}
      {showAllEmails ? (
        <button onClick={toggleShowAllEmails}>Hide All Subscribers</button>
      ) : (
        <button onClick={getAllEmails}>Show All Subscribers</button>
      )}

      {/* show all emails */}
      {showAllEmails &&
        showAllEmails.map((email) => {
          return <p key={email._id}>{email.email}</p>;
        })}

      {/* if unsubscribed */}
      {!subscribed && (
        <div>
          <input
            ref={resetInputFieldRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={enterKeySubmit}
          />
          <button onClick={emailButtonSubmit}>Subscribe</button>
          {error && <p> {error} </p>}
        </div>
      )}

      {/* if subscribed */}
      {subscribed && (
        <div>
          <p>Thanks for subscribing {email}!</p>
        </div>
      )}
    </div>
  );
}

export default App;
