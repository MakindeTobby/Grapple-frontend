import './Newblog.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import http from '../Auth/Api/http';

const Submit = () => {
  const [image, setImage] = useState('')
  const [title, setTittle] = useState('')
  const id = localStorage.getItem('DocId')

  // post api
  const Posted = (e) => {
    e.preventDefault();
    if (title) {
      postimage()
    }
    else { return };
  }

  const handlechange = (e) => {
    setImage(e.target.files[0]);
  }

  const postimage = () => {
    const formData = new FormData()
    formData.append('DoctorId', id)
    formData.append('image', image)
    formData.append('DocumentName', title)
    http.post('/uploadDoctorDocument', formData).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }



  //delete api 

  //    const id = async(id,i)=> {
  //     const url = "http://localhost:9000/delete"
  //     await axios.post(url,{id})
  //     setData([...data].filter((item,index)=>{
  //       return index!=i
  //     }))
  //   }



  return (
    <>
      <div className='create'>
        <Link to={'/'}><i id='move' class="fa-solid fa-arrow-left"></i></Link>
        <h2>Add a new blog</h2>
        <form>
          <label>Blog title:</label>
          <input accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            type="text"
            required onChange={e => setTittle(e.target.value)} />

          <label>Author Image:</label>
          <img width={"100%"} src={image === "" ? "" :
            URL.createObjectURL(image)} />
          <label style={styles.label}>
            <i class="fa-solid fa-plus"></i>
            <input type="file" required style={styles.main} onChange={handlechange} />
          </label>
          <button onClick={Posted}>Add Blog</button>
        </form>
      </div> <br /> <br />


    </>
  )
}
const styles = {
  main: {
    backgroundColor: 'black',
    display: 'none',

  },
  label: {
    border: '1px solid black',
    width: '40px',
    height: '40px',
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex", justifyContent: "center", alignItems: "center", textAlign: 'center'
  }
}
export default Submit