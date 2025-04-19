// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Main() {


  //Iniziallizzo oggetto vuoto dove questi campi andranno a riempirsi
  const initialFormData = { title: "", description: "" }

  // Imposto lo stato per il form con campi vuoti
  const [formData, setFormData] = useState(initialFormData)

  // Impostiamo lo stato con array vuoto per aggiungere le informazione dell utente in page
  const [addTask, SetAddTask] = useState([])

  // Impostiamo lo stato che gestisce il count
  const [count, SetCount] = useState(0)



  // GESTIRE I VARI ERRORI PER OGNI INPUT VALIDAZIONI
  const [errorGeneral, setErrorGeneral] = useState(''); // Stato per gestire l'errore
  // ERRORE TITOLO
  const [errorTitle, setErrorTitle] = useState(''); // Stato per gestire l'errore
  // ERRORE Description
  const [errorDescription, setErrorDescription] = useState(''); // Stato per gestire l'errore



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

    // Quando l'utente inizia a scrivere, rimuovi l'errore corrispondente
    if (name === "title") {
      setErrorTitle("");
    }

    if (name === "description") {
      setErrorDescription("");
    }

    // Se c'è un errore generale
    if (errorGeneral) {
      setErrorGeneral(""); // Rimuovi l'errore generale

      // Se sto scrivendo nella descrizione, controlla il titolo
      if (name === "description") {
        if (formData.title.trim() === "") {
          setErrorTitle("Titolo non inserito");
        }
      }

      // Se sto scrivendo nel titolo, controlla la descrizione
      if (name === "title") {
        if (formData.description.trim() === "") {
          setErrorDescription("Descrizione non inserita");
        }
      }
    }


  }


  // Ora andiamo a gestire l invio del form
  function OnSubmit(e) {
    // all invio non resetta la pagina
    e.preventDefault();


    // VALIDAZIONE GENERALE DEL FORM sia per entrambi titolo e e descrizione etcc
    if (formData.title.trim() === "" && formData.description.trim() === "") {
      setErrorGeneral("Titolo e descrizione non possono essere vuoti.")
      return
    }

    if (formData.title.trim() === "") {
      setErrorTitle("Titolo non inserito")
      return
    }

    if (formData.description.trim() === "") {
      setErrorDescription("Descrizione non inserita")
      return
    }
    // VALIDAZIONE PIU APPROFONDITE COME IL NUMERO DI CARATTERI MINIMI O MASSIMI


    // Incremento del numero per le task
    const increment = () => {
      SetCount(count + 1)
    }

    // Ora dobbiamo gestire che all invio del form quei dati compilati devono essere aggiunti sotto 
    SetAddTask((initial) => {

      increment()
      return [...initial, formData] //Faccio copia di initial [] poi gli dico aggiungimi FormData che sarebbe l ogetto con i value riempiti 
    })




    // DOPO INVIO DEL FORM RESET DI TUTTO IL FORM COMPRESO GLI ERRORI 
    setFormData(initialFormData);
    setErrorGeneral("")
    setErrorTitle("")
    setErrorDescription("")

    // sSemplice console.log per vedere il formData cioe l oggetto che ho compilato
    console.log(formData)

  }

  return (
    <>
      <div className="container-main">
        <div className="flex-main">

          <div className="form-container">
            <form action="submit" onSubmit={OnSubmit} autoComplete="off">
              <input
                type="text"
                value={formData.title}
                name="title"
                placeholder="Title"
                onChange={OnChange}
                style={{ border: errorGeneral || errorTitle ? '2px solid red' : null }}
              />
              {/* SE ERROR TITLE che e in questo caso e "Titolo non inserito",la condizione errorTitle diventa vera e quindi il paragrafo <p> con il messaggio di errore verrà renderizzato. */}
              {errorTitle ? <p style={{ color: 'red' }}>{errorTitle}</p> : null}

              {/* &&: Se la condizione a sinistra è vera (truthy), esegue il codice a destra. Se la condizione è falsa (falsy), non esegue nulla. */}

              <input
                type="text"
                value={formData.description}
                name="description"
                placeholder="Description"
                onChange={OnChange}
                style={{ border: errorGeneral || errorDescription ? '2px solid red' : null }}
              />
              {errorDescription && <p style={{ color: 'red' }}>{errorDescription}</p>}

              <button >Add <span style={{ color: "#5E60CE", }}>Task</span></button>
              {errorGeneral && <p style={{ color: 'red' }}>{errorGeneral}</p>}
            </form>
          </div>

          <div className="task-container">
            <section className="up-section">
              <span style={{color:"#4EA8DE",fontSize:"13px"}}>Task created:
                <span style={{ backgroundColor: "#808080", color: "white", padding: "2px 5px", borderRadius: "9999px",fontSize:"12px",marginLeft:"5px" }}>{count}</span>

              </span>

              <span style={{color:"#8284FA",fontSize:"13px"}}>Completed: 
                <span style={{ backgroundColor: "#808080", color: "white", padding: "2px 5px", borderRadius: "9999px",fontSize:"12px",marginLeft:"5px" }}>{count} </span>
              </span>
            </section>

            {addTask.length <= 0 ?
              <section className="down-section-empty">
                <div className="container-empty">
                  <img src="../img/Clipboard.png" alt="" />
                  <p>You don't have any tasks registered yet
                    Create tasks and organize your to-do items</p>
                </div>
              </section>


              :

              <section className="down-section">

                {addTask.map((task, index) => (
                  <section className="section-task" key={index}>
                    <input type="checkbox" />
                    <p>{task.title} : {task.description}</p>

                    <span><FontAwesomeIcon icon={faTrash} style={{ color: "#808080", }} /></span>
                  </section>
                ))}


              </section>
            }

          </div>

        </div>
      </div>
    </>
  )
}









