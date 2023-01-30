const Note = ({ note, toggleImportance, updateLabel }) => {
    const label = note.important ? 'make not important' : 'make important'
    
    return (
      <li className="note" data-testid='note'>
        {note.content} 

        <button style={{marginLeft: 10}} onClick={() => {
                toggleImportance(note.id)
                updateLabel([label])
                }
            }>
            {label}
        </button>
      </li>
    )
  }
  
  export default Note