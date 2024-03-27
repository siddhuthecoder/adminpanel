import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const Documentation = () => {
  const navigate = useNavigate();
  const [clients,setClients] = useState([])
  const [fileData, setFileData] = useState(null);
  const [token,setToken] = useState("")
  const [resourceData, setResourceData] = useState({
    title:'',
    file: null,
    sendTo:""
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getToken = localStorage.getItem("token");
    
        setToken(getToken);
  
        const result = await axios.get("http://localhost:8080/admin/client/all-clients", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
  
        if (result.status !== 200) {
          throw new Error('Network response was not ok');
        }
  
        setClients(result.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, [token]);


  const handleForm = (e) => {
    const newData = { ...resourceData };
    if (e.target.name === 'file') {
      newData[e.target.name] = e.target.files[0];
    } else {
      newData[e.target.name] = e.target.value;
    }
    setResourceData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', resourceData.title);
    formData.append('user_email', resourceData.sendTo);
    formData.append('pdf_file', resourceData.file);


    try{
      
      const response = await axios.post("http://localhost:8080/client/uploadPdf",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      if(response.status==200){
        alert('Request successfully sent');
  
        window.location.reload(); 
      }
    }
    catch(err){
      console.log(err)
    }

   
  };

 

  return (
    <section className="resource-form w-100 mt-3" style={{ width: '97%', maxWidth: '1100px', height: '87vh', backgroundColor: '#121212', color: '#ffffff' }}>
      <div className="text-center h3 bold-2 py-3" style={{ color: '#83eeee' }}>
        Upload Documents!
      </div>
      <p className="text-center tag-line">Lorem ipsum dolor sit amet consectetur adipi</p>
      <form
        className="resource-form d-flex flex-column shadow ps-3 py-3 mx-auto"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          width: '97%',
          maxWidth: '450px',
          height: 'auto',
          backgroundColor: '#212529', // Dark blue background color
          color: '#ffffff', // White text color
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderRadius: '10px' // Rounded corners
        }}
      >
        <span className="mt-3">
          <label htmlFor="title" className="ps-2">
            Title
          </label>
          <input type="text" name="title" placeholder="Title of the book" value={resourceData.title} onChange={handleForm} required style={{ backgroundColor: '#121212', color: '#ffffff', border: 'none' }} />
        </span>

        <span className="mt-3">
          <label htmlFor="sendTo" className="ps-2">Send to</label>
          <select name="sendTo" id="" onChange={handleForm} style={{ backgroundColor: '#121212', color: '#ffffff', border: 'none' }}>
            <option className="pe-4" value="">--SELECT--</option>
            {clients.map((data) => (
              <option value={data.email} className="">{data.email}</option>
            ))}
          </select>
        </span>

        <span className="mt-3">
          <label htmlFor="bFile" className="ps-2">
            Upload File
          </label>
          <input type="file" name="file" placeholder="Upload file" onChange={handleForm} required style={{ backgroundColor: '', color: 'black', border: 'none' }} />
        </span>

        <span className="mt-5 w-100">
          <input type="submit" value="Submit" className="w-100" style={{ backgroundColor: '#83eeee', color: '#121212' }} />
        </span>
      </form>
    </section>

  );
}
export default Documentation
