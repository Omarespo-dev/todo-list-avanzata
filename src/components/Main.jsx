// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Main() {


  //Iniziallizzo oggetto vuoto dove questi campi andranno a riempirsi
  const initialFormData = { title: "", description: "" }

  // Imposto lo stato per il form con campi vuoti
  const [formData, setFormData] = useState(initialFormData)


  // Ora per la versione con il local storage 1 step si controlla se ci sono task salvati nel localStorage

  // useEffect(() => {

  // })



  //Andiamo a fare la funzione per Onchange quando l utente scrive dentro l input
  function OnChange(e) {
    // facciamo il destructoring e ricaviamo il nome dall input e valore 
    const { name, value } = e.target

    

    // passo il parametro solo per ricavarmi lo stato attuale di setFormData e modificarlo
    setFormData({

      ...formData, // = { title: "", description: "" }
      [name]: value     // = { title: "Ciao" }

    });

    // “Prendi il name dall’input (cioè il nome del campo, tipo title o description), e mettici dentro il value (cioè quello che l’utente sta scrivendo)”.

  }

  
  
  
  // Impostiamo lo stato con array vuoto
  const [addTask, SetAddTask] = useState([])


  // GESTIRE I VARI ERRORI PER OGNI INPUT 
  const [errorGeneral, setErrorGeneral] = useState(''); // Stato per gestire l'errore
  // ERRORE TITOLO
  const [errorTitle, setErrorTitle] = useState(''); // Stato per gestire l'errore
  // ERRORE Description
  const [errorDescription, setErrorDescription] = useState(''); // Stato per gestire l'errore


  // Ora andiamo a gestire l invio del form
  function OnSubmit(e) {
    // all invio non resetta la pagina
    e.preventDefault();

    console.log(formData)

    // VALIDAZIONE GENERALE DEL FORM sia per entrambi titolo e e descrizione etcc
    
    if(formData.title === "" && formData.description === ""){
      setErrorGeneral("Titolo e descrizione non possono essere vuoti.")
      return
    }

    if(formData.title === ""){
      setErrorTitle("Titolo non inserito")
      return
    }
    
    if (formData.description === ""){
      setErrorDescription("Descrizione non inserita")
      return
    }

    
    
    // Ora dobbiamo gestire che all invio del form quei dati compilati devono essere aggiunti sotto 
    SetAddTask((initial) => {
      return [...initial, formData] //Faccio copia di initial [] poi gli dico aggiungimi FormData che sarebbe l ogetto con i value riempiti 
      
    })

    
    // DOPO INVIO DEL FORM RESET DI TUTTO IL FORM COMPRESO GLI ERRORI 
    setFormData(initialFormData);
    setErrorGeneral("")
    setErrorTitle("")
    setErrorDescription("")

  }

  // VERIFICA CON CONSOLE.LOG FATTA CON USE EFFECT   
  // AL MONTAGGIO DEL COMPONENTE FAMMI IL CONSOLE.LOG DI ADDTASK  E ANCHE QUANDO CAMBIA ADDTASK
  // useEffect(() => {
  //   console.log(addTask);
  // }, [addTask]);


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
              {errorTitle && <p style={{ color: 'red' }}>{errorTitle}</p>}

              <input
                type="text"
                value={formData.description}
                name="description"
                placeholder="Description"
                onChange={OnChange}
              />
              {errorDescription && <p style={{ color: 'red' }}>{errorDescription}</p>}

              <button>Add <span style={{ color: "#5E60CE" }}>Task</span></button>
              {errorGeneral && <p style={{ color: 'red' }}>{errorGeneral}</p>}
            </form>
          </div>

          <div className="task-container">
            <section className="up-section">
              <span>Task created</span>
              <span>Completed</span>
            </section>

            <section className="down-section">

              {addTask.map((task,index) => (
                <section className="section-task" key={index}>
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
