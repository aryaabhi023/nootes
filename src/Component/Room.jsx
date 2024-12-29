import { useState,useEffect } from "react";
import { useParams} from "react-router-dom";
import Button2 from "../SharedComponent/Button2";
import Card2 from "../SharedComponent/Card2";
import notedb from "../Appwrite/NoteDb";

export default function Room() {

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
         <Card2 props={note} key={note?.$id}/>
        ))}
      </div>
    </div>
  );
}
