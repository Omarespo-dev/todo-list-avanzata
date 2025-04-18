// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Main() {


  //Iniziallizzo oggetto vuoto dove questi campi andranno a riempirsi
  const initialFormData = { title: "", description: "" }

  // Imposto lo stato per il form con campi vuoti
  const [formData, setFormData] = useState(initialFormData)

  

  //Andiamo a fare la funzione per Onchange quando l utente scrive dentro l input
  function OnChange(e) {
    // facciamo il destructoring e ricaviamo il nome dall input e valore 
    const { name, value } = e.target


    // passo il parametro solo per ricavarmi lo stato attuale di setFormData e modificarlo
    setFormData((currentFormData) => ({

      ...currentFormData, // = { title: "", description: "" }
      [name]: value     // = { title: "Ciao" }

    }));

    // “Prendi il name dall’input (cioè il nome del campo, tipo title o description), e mettici dentro il value (cioè quello che l’utente sta scrivendo)”.

  }

  // Impostiamo lo stato con array vuoto
  const [addTask, SetAddTask] = useState([])


  // Ora andiamo a gestire l invio del form
  function OnSubmit(e) {
    // all invio non resetta la pagina
    e.preventDefault();

    // Ora dobbiamo gestire che all invio del form quei dati compilati devono essere aggiunti sotto 
    SetAddTask((initial) => {
      return [...initial, formData] //Faccio copia di initial [] poi gli dico aggiungimi FormData che sarebbe l ogetto con i value riempiti 
    })
    
    setFormData(initialFormData);
  }



  return (
    <>
      <div className="container-main">
        <div className="flex-main">

          <div className="form-container">
            <form action="submit" onSubmit={OnSubmit}>
              <input
                type="text"
                value={formData.title}
                name="title"
                placeholder="Title"
                onChange={OnChange}
              />

              <input
                type="text"
                value={formData.description}
                name="description"
                placeholder="Description"
                onChange={OnChange}
              />

              <button>Add <span style={{ color: "#5E60CE" }}>Task</span></button>
            </form>
          </div>

          <div className="task-container">
            <section className="up-section">
              <span>Task created</span>
              <span>Completed</span>
            </section>

            <section className="down-section">

              {addTask.map((task) => (
                <section className="section-task">
                  <input type="checkbox" />
                  <p>{task.title} : {task.description}</p>

                  <span><FontAwesomeIcon icon={faTrash} style={{ color: "#808080", }} /></span>
                </section>
              ))}




            </section>
          </div>

        </div>
      </div>
    </>
  )
}
