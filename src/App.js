import './App.css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import {storage, firestore} from './config/firebase'
import { doc, addDoc, collection, Timestamp } from "firebase/firestore"; 
import {v4} from 'uuid'
import {converter} from './hooks/file'
function App() {
  
  //file from device
  const [file, setImage] = useState(null)
  
  //firebase url file
  const [urlStorageFile, setUrl] = useState('')

  //documents saved 
  const handleChange = (e) => {
    console.log(e.target.files[0])
    if(e.target.files[0]){
     setImage(e.target.files[0]) 
    }
  }

 
  const uploadFile = () => {
    //get storage bucket from firebase app
    const {fileName, ext} = converter(file)
    
    const fileInformation = {
      name : fileName,
      extension : ext,
      id : `${v4()}.${ext}`
    }

    let referenceToFile = ref(storage, `documentos/${fileInformation.id}`)
    
    uploadBytesResumable(referenceToFile, file)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then( async (url) => {
        await insertToDB(url, fileInformation)
      });
    })
    .catch((error) => {
      console.error('Upload failed', error);
    });
  }

  const insertToDB = async (url, file) => {
    //payload to firestore
    const data = {
      url: url,
      nameFile : file.name,
      documentId:file.id,
      created_at:Timestamp.fromDate(new Date()).toDate(),
      updated_at:Timestamp.fromDate(new Date()).toDate()
    }
    await addDoc(collection(firestore, "documents"), data);
  }

  return (
    <div className="App">
      <h4>Subida de archivos</h4>
      <label>
        Selecciona archivo
      <input type="file" id="file" onChange={handleChange} />        
      </label>
      <button onClick={uploadFile}>Subir archivo</button>
      <h4>Lista de archivos</h4>

    </div>
  );
}

export default App;
