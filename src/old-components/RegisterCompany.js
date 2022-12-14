import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COMPANY_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const CompanyNameRef = useRef();
  const errRef = useRef();

  const [companyName, setCompanyName] = useState("");
  const [validCompanyName, setValidCompanyName] = useState(false);
  const [companyNameFocus, setCompanyNameFocus] = useState(false);

  const [companyEmail, setCompanyEmail] = useState("");
  const [validCompanyEmail, setValidCompanyEmail] = useState(false);
  const [companyEmailFocus, setCompanyEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    CompanyNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = COMPANY_REGEX.test(companyName);
    console.log(result);
    console.log(companyName);
    setValidCompanyName(result);
  }, [companyName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(companyEmail);
    console.log(result);
    console.log(companyEmail);
    setValidCompanyEmail(result);
  }, [companyEmail]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [companyName, companyEmail, pwd, matchPwd]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmCompanyName = COMPANY_REGEX.test(companyName);
    const confirmEmail = EMAIL_REGEX.test(companyEmail);
    const confirmPwd = PWD_REGEX.test(pwd);
    if (!confirmCompanyName || !confirmEmail || !confirmPwd ){
        setErrMsg("Invalid Entry/Entries");
        return;
    }
    console.log(companyName, companyEmail, pwd);
    setSuccess(true);

  }

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register Company Account</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="companyname">
          Company Name:
          <FontAwesomeIcon
            icon={faCheck}
            className={validCompanyName ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validCompanyName || !companyName ? "hide" : "invalid"}
          />
        </label>
        <input
          type="text"
          id="companyname" /* username -> companyname*/
          ref={CompanyNameRef}
          autoComplete="off"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
          required
          aria-invalid={validCompanyName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setCompanyNameFocus(true)}
          onBlur={() => setCompanyNameFocus(false)}
        />
        <p
          id="cnidnote" /*uidnote -> cnidnote*/
          className={
            companyNameFocus && companyName && !validCompanyName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="companyemail">
          Company Email:
          <FontAwesomeIcon
            icon={faCheck}
            className={validCompanyEmail ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validCompanyEmail || !companyEmail ? "hide" : "invalid"}
          />
        </label>
        <input
          type="email"
          id="companyemail" /* username -> companyemail*/
          ref={CompanyNameRef}
          autoComplete="off"
          onChange={(e) => setCompanyEmail(e.target.value)}
          value={companyEmail}
          required
          aria-invalid={validCompanyEmail ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setCompanyEmailFocus(true)}
          onBlur={() => setCompanyEmailFocus(false)}
        />
        <p
          id="emailnote" /*uidnote -> emailnote*/
          className={
            companyEmailFocus && companyEmail && !validCompanyEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Email must be of the following form example@mail.com
        </p>

        <label htmlFor="password">
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !pwd ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd">
          Confirm Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPwd ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button
          disabled={!validCompanyName || !validCompanyEmail || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already registered?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">Sign In</a>
        </span>
      </p>
    </section>
  );
};

export default Register;
