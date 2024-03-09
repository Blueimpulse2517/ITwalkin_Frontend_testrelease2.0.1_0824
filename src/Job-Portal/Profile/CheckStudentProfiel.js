import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png"
import { Puff } from  'react-loader-spinner'
import useScreenSize from '../SizeHook';

function CheckStudentProfile() {

    const [profileData, setProfileData] = useState([])
const [PageLoader, setPageLoader] = useState(false)
const screenSize = useScreenSize();



    let studId = JSON.parse(localStorage.getItem("StudId"))

    let params =useParams()

    async function getProfile() {
        setPageLoader(true)
        await axios.get(`https://itwalkin-backend.onrender.com/StudentProfile/getProfile/${params.CP}`)
            .then((res) => {
                let result = res.data.result
                setProfileData([result])
        setPageLoader(false)

            }).catch((err) => {
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
 {
profileData.map((item, i) => {
    return (
        <div key={i}>
        <img className={styles.imageV} src={item.image?item.image : profileDp}/>
        
        </div>
    )

})
    } 


           {screenSize.width>850?
           
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email  Address</b></li>
                <li className={styles.li}><b>Phone  Number</b></li>
                <li className={styles.li}><b>Aadhar</b></li>
                <li className={styles.li}><b>Pan  Card</b></li>
                <li className={styles.li}><b>Age</b></li>
                <li className={styles.li}><b>Notice  Period</b></li>
                <li className={styles.li}><b>Expected  Salary</b></li>
                <li className={styles.li}><b>Current  CTC</b></li>
                <li className={styles.li}><b>Qualification</b></li>
                <li className={styles.li}><b>Skills</b></li>
                <li className={styles.li}><b>Experience</b></li>

            </ul>
            {PageLoader?
 <Puff  height="80"  width="80"  color="#4fa94d"  ariaLabel="bars-loading"  wrapperStyle={{marginLeft:"22%", marginTop:"60px"}}/> 
     :""
  }

            {

                profileData.map((item, i) => {
                    return (
                        <ul className={styles.ulR} key={i}>
                            <li className={`${styles.Hli}`}>{item.name?item.name:<li className={styles.Nli}>Not Updated</li>}</li>
                            <li className={`${styles.Hli}`}>{item.email?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.phoneNumber?item.phoneNumber:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Aadhar?<li className={styles.Nli}>###########</li>:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.panCard?<li className={styles.Nli}>###########</li>:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.age?item.age:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.NoticePeriod?item.NoticePeriod:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ExpectedSalary?item.ExpectedSalary:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.currentCTC?item.currentCTC:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Qualification?item.Qualification:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Skills?item.Skills:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Experiance?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                        </ul>
                    )
                })

            }
            </div>
            :
            <>
            <div id={styles.JobCardWrapper} >

{profileData.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>
        <div style={{display:"flex"}}>
        <div className={styles.LeftTable}>
                        <span className={styles.span}>Name :  </span> <br></br>
                        <span className={styles.span}>Age :</span><br></br>
                        <span className={styles.span}> Email Id :</span><br></br>
                        <span className={styles.span}> Phone number :</span><br></br>
                        <span className={styles.span}> Notice Period :</span><br></br>
                        <span className={styles.span}>Qualification :</span><br></br>
                        <span className={styles.span}>Experience : </span><br></br>
                        <span className={styles.span}> Current CTC :</span><br></br>
                        <span className={styles.span}>Expected CTC : </span><br></br>
                    </div>
            
                    <div className={styles.RightTable}>
                    <span className={styles.span}><span style={{color:"blue"}}  >{job.name}</span></span><br></br>      
                    <span className={styles.span}>{job.age? <span style={{ color: "blue" }}>{job.age} </span>:<span style={{color:"red"}}>Not updated</span> }</span><br></br>
                    <span className={styles.span}> {job.email?<span style={{ color: "blue" }}>{job.email} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.phoneNumber?<span style={{ color: "blue" }}>{job.phoneNumber} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.NoticePeriod?<span style={{ color: "blue" }}>{job.NoticePeriod} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Qualification?<span style={{ color: "blue" }}>{job.Qualification} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Experiance?<span style={{ color: "blue" }}>{job.Experiance} </span>:<span style={{color:"red"}}>Not updated</span>}   </span><br></br>
                    <span className={styles.span}>{job.currentCTC?<span style={{ color: "blue" }}>{job.currentCTC} </span>:<span style={{color:"red"}}>Not updated</span>} </span><br></br>
                    <span className={styles.span}> {job.ExpectedSalary?<span style={{ color: "blue" }}>{job.ExpectedSalary} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>          
                    </div>
            
                  </div>

                  <div className={styles.Down}>
                  <span className={styles.span}> Skills : {job.Skills?<span style={{ color: "blue" }}>{job.Skills} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                  </div>

      </div>
    </>
  )
})}

</div>
            </>
}
        </>
    )
}

export default CheckStudentProfile