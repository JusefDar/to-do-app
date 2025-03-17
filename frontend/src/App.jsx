import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("")
  useEffect(() => {
    fetch("http://localhost:3050/liste_abrufen")
    .then((res) => res.json())
    .then(setTasks)
  }, []);
  const itemHinzufuegen = () => {
    fetch("http://localhost:3050/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title}),
    })
    // hier möchte ich, dass die Liste in der App auch aktualisiert wird
      .then((res) => res.json())
      .then((neueAufgabe) => setTasks([...tasks, neueAufgabe]))
    setTitle("");
  }
  const itemLoeschen = (id_nummer) => {
    fetch(`http://localhost:3050/delete/${id_nummer}`, {
      method: "DELETE",
    })
      .then((res) => res.json()) // Falls der Server eine Bestätigung zurücksendet
      .then(() => {
        // Aktualisiere den State, indem das gelöschte Item aus der Liste entfernt wird
        setTasks(tasks.filter(task => task.id !== id_nummer));
      })
      .catch((error) => console.error("Fehler beim Löschen:", error));
  };
  return (
    <>
      <h1>To-Do List</h1>
      <input value={title}  onChange={(e)=>setTitle(e.target.value)} />
      <button disabled={!title.trim()} onClick={itemHinzufuegen}>Add</button> {/* Option 2 für Eingabecheck: Button wird disabled bleiben wenn das Eingabefeld leer ist*/}
      <ul>
        {// hier gehört der Code, um die To-Do Liste dynamisch zu gestalten
        tasks.map(({id, title, completed}) => (
          <li key={id}>
            <input type='checkbox' /> {title}
            <button onClick= {() => itemLoeschen(id)}>x</button>
          </li>
        ))
        }
      </ul>
    </>
  )
}
export default App