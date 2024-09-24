// Modal.js
import { useState, useEffect } from "react"
import React from 'react'
import styles from "./login.module.css"
import axios from "axios"
import { useNavigate, Link, useLocation } from "react-router-dom";
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"
import { useGoogleLogin } from '@react-oauth/google';
import image from "../img/user_3177440.png"
import { TailSpin } from "react-loader-spinner"

const Modal = ({ isStuOpen, onClose, children }) => {
	
  const [gmailuser, setGmailuser] = useState("")
  const [topErrorMessage, setTopErrorMessage] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [otp, setotp] = useState("")
  
  const [showotp, setshowotp] = useState(false)
  const [Loader, setLoader] = useState(false)

  
const [ipAddress, setIPAddress] = useState('')
  
  // ......Modal....
	const [open, setOpen] = React.useState(false);
   
	  const handleClose = () => {
		  setOpen(false);
	  };
   
	  const handleOpen = () => {
		  setOpen(true);
	  };
  
  
  
useEffect(() => {
	fetch('https://api.ipify.org?format=json')
	  .then(response => response.json())
	  .then(data => setIPAddress(data.ip))
	  .catch(error => console.log(error))
  }, []);
  
  
	let location = useLocation()
  
	let navigate = useNavigate()
  
	const login = useGoogleLogin({
	  onSuccess: async (response) => {
		try {
  
		  const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
			{
			  headers: {
				Authorization: `Bearer ${response.access_token}`,
			  },
			}
		  );
		  setGmailuser(res.data)
		  let gtoken = response.access_token
		  let userId = res.data.sub
		  let email = res.data.email
		  let name = res.data.name
		  let isApproved=false
		  // let image= res.data.picture
		  // console.log("decoded name :", gemail)
		  // console.log(" decoded id :", gname)
  
		  await axios.post("/StudentProfile/Glogin", {ipAddress, userId, email, name, gtoken, isApproved })
			.then((response) => {
			  let result = response.data
			  let token = result.token
			  let Id = result.id
			  if (result.status == "success") {
				localStorage.setItem("StudLog", JSON.stringify(btoa(token)))
				navigate("/alljobs", {state:{name:result.name}})
				localStorage.setItem("StudId", JSON.stringify(Id))     
				onClose()

			  }
			}).catch((err) => {
			  alert("server issue occured")
			})
  
		} catch (err) {
		  alert("some thing went wrong with google gmail", err)
		}
	  }
	})
  
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const [a, setA] = useState("")
	const [studloggedin, setStudoggedin] = useState(false)
	const [topuperror, setTopuperror] = useState("")
  
  
	useEffect(() => {
	  let studentAuth = localStorage.getItem("StudLog")
	  if (studentAuth) {
		navigate("/alljobs")
	  }
	})
	useEffect(() => {
	  // let studentAuth = localStorage.getItem("StudLog")
	  let EmployeeAuth = localStorage.getItem("EmpLog")
	  if (EmployeeAuth) {
		navigate("/postedjobs")
	  }
	}, [])
  
	useEffect(()=>{
	  let adminLogin= localStorage.getItem("AdMLog")
	  if(adminLogin){
		navigate("/BIAddmin@Profile")
	  }
	},[])
  
	// async function Studlogin() {
	//   console.log("before sending to backend", email, password)
	//   await axios.post("http://localhost:8080/user/login/", { email, password })
	//     .then((response) => {
	//       console.log(response)
	//       let result = response.data
	//       console.log(result)
	//       if (result.token) {
	//         localStorage.setItem("StudLog", JSON.stringify(result.token))
	//         let sudid = result.id
	//         localStorage.setItem("StudId", JSON.stringify(sudid))
	//         // console.log(result.id)
	//         navigate("/alljobs", {state:{userId : sudid}})
	//       } else if (result == "incorrect password") {
	//         setTopuperror("! incorrect passord")
	//       } else if (result == "no user found") {
	//         setTopuperror("! no user exist with this mail id")
  
	//       }
	//     }).catch((err) => {
	//       alert("server issue occured")
	//       console.log("server issue occured")
	//     })
  
	// }
  
	// function login() {
	//   window.open(
	//     `http://localhost:8080/auth/google/callback`,
	//     "_self"
  
	//   );
	// }
  
	async function sendOtp() {
	  await axios.post("/StudentProfile/otpSignUp", { PhoneNumber })
		.then((res) => {
		  if (res.data == "otp sent") {
			setshowotp(true)
		  }
		})
	}
  
	async function confirmOtp() {
	  let isApproved = false
	  setLoader(true)
	  setTimeout( async () => {     
  
	  await axios.post("/StudentProfile/verifyOtp", { ipAddress, otp , isApproved})
		.then((res) => {
		  //  console.log(res.data)
		  let result = res.data
			  let token = result.token
			  let Id = result.id
			  if(result=="incorrect Otp"){
			  alert("incorrect OTP")}
			  if (result.status == "success") {
				localStorage.setItem("StudLog", JSON.stringify(token))
				navigate("/alljobs", {state:{name:result.name}})
				localStorage.setItem("StudId", JSON.stringify(Id))
			  }     
			  setLoader(false)
		  
		}).catch((err)=>{
		  alert("some thing went wrong")
		})
	  }, 1000);
  
	  setLoader(false)
	}
	  if (!isStuOpen) return null;


	return (
		<>
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex:100
			}}
		>
			<div
				style={{
					background: "white",
					height: "50%",
					width: "50%",
					margin: "auto",
					paddingRight: "5%",
					paddingTop: "5%",
					paddingBottom: "5%",
					border: "1px solid #000",
					borderRadius: "10px",
					boxShadow: "2px solid black",
					zIndex:"100"
				}}
			>
				<p onClick={onClose} style={
					{position:"absolute", marginLeft:"52%", marginTop:"-62px", cursor:"pointer", display:"inline"}}>
					
                    <i className="fas fa-times" style={{fontSize:"x-large"}}></i>
				</p>

				{/* {children} */}
                <>

      
<div className={styles.BothsignUpWrapper}>
<h3 className={styles.Loginpage}> Job Seeker Login page  </h3>

          <input maxLength="10" className={styles.inputs} type="number" placeholder='enter phone Number'
            value={PhoneNumber} autoComplete="on" onChange={(e) => { setPhoneNumber(e.target.value) }} />
          {/* {error && !email ? <p >field is missing</p> : ""} */}


          {showotp ?
            <>
              <input className={styles.inputs} placeholder='enter OTP'
                value={otp} onChange={(e) => { setotp(e.target.value) }} />
              <button className={`${styles.button} ${styles.inputs}`} onClick={confirmOtp}>Confirm OTP</button>

              <p style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setshowotp(false); setPhoneNumber(""); setotp("") }}>Want to change the number?</p>


            </>
            :
            PhoneNumber.length==10?
            <button className={`${styles.button} ${styles.inputs}`} onClick={sendOtp} disabled>Send OTP</button>
            :
            <button className={`${styles.button} ${styles.inputs}`} onClick={()=>{alert("invalid phone number")}}>Send OTP</button>

          }
           {Loader?
          <div style={{marginLeft:"10%"}}>
                        <TailSpin color=" rgb(40, 4, 99)" height={40} />
                        </div>
                        :""}
{/* 
        </div>
      </div> */}
            <h4 className={styles.OR}>OR</h4>




      <div className={styles.signUpWrapper} onClick={login} >
        <div className={styles.both}>
          <img className={styles.google} src={GoogleImage} />
          <span className={styles.signUpwrap} >Continue with Google</span>
        </div>
       </div>

      <div className={styles.signUpWrapper}  >
        <div className={styles.both}>
          <img className={styles.google} src={MicosoftImage} />
          <span className={styles.signUpwrap} >Continue with Microsoft</span>
        </div>
      </div>
      </div>
      {/* </div> */}
    </>
                
			</div>
		</div>
		</>
	);
};

export default Modal;