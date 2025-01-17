import { useState,useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Button2 from "../SharedComponent/Button2";
import notedb from "../Appwrite/NoteDb";
import { useSelector } from "react-redux";

export default function Room() {
  const user=useSelector((state)=>state.auth.user);
  const navigate=useNavigate();

  const [note, setNote] = useState({
    title: "",
    description: ""
  });

  const [notes, setNotes] = useState(null);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await notedb.createNote({
      title: note.title,
      description: note.description,
      room: id
    });
    if (data) {
      setNotes([...notes, data]);
    }
    setNote({
      title: "",
      description: ""
    });
  };

  useEffect(()=>{
    notedb.getNotes(id).then((data)=>{
      if(data){
        setNotes(data.documents);
      }
    })
  },[])

  const deleteNote = (id) => {
    notedb.deleteNote(id).then((data)=>{
      if(data){
        setNotes(notes.filter((note)=>note.$id!==id));
      }
      else if(!user){
        navigate("/login")
      }
    })
  }

  return (
    <div className="w-full">
      <div className="flex justify-center pt-10">
        <form className="w-full text-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Title"
            className="m-3 p-2 rounded-xl text-center focus:outline-none ring-2 focus:ring-green-200"
            value={note.title}
            onChange={(e) => {
              setNote({
                ...note,
                title: e.target.value
              })
            }}
            autoComplete="off"
            required
          />
          <div>
            <textarea
              className="h-80 w-3/4 p-2 whitespace-pre overflow-x-auto overflow-y-auto font-mono focus:outline-none ring-2 focus:ring-green-200"
              placeholder="Enter the text here"
              value={note.description}
              onChange={(e) => {
                setNote({
                  ...note,
                  description: e.target.value
                })
              }}
              autoComplete="off"
              required
            ></textarea>
          </div>
          <Button2 name="Save" type="submit"/>
        </form>
      </div>

      <div className="flex flex-col justify-center items-center">
        {notes?.map((note) => (
         <div className="bg-[#ccc] w-3/4 my-2 rounded-lg" key={note.$id}>
         <div className="float-right p-2" onClick={()=>deleteNote(note.$id)}>
           <img src="https://img.icons8.com/?size=100&id=63688&format=png&color=000000" className="w-6 cursor-pointer" />
         </div>
         <div className="flex p-2 gap-1">
           <div className="circle">
             <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full" />
           </div>
           <div className="circle">
             <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full" />
           </div>
           <div className="circle">
             <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full" />
           </div>
         </div>
         <div>
           <div className="flex flex-col">
             <h1 className="text-xl text-center font-bold">{note.title}</h1>
             <div className="flex justify-start bg-[#fff] rounded-lg p-2 m-2">
               <pre className="text-gray-600 overflow-x-auto">
                 {note.description}
               </pre>
             </div>
             <p className="text-gray-500 text-center">{note.date}</p>
           </div>
         </div>
       </div>
        ))}
      </div>
    </div>
  );
}
