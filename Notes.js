

const App = () => {
       const [value, setValue] = useState(10)
     
       return (
         <div>
           {value}
           <button>reset to zero</button>
         </div>
       )
     }
     
     
         // Won't Work
         <button onClick="crap...">button</button>
         <button onClick={value + 1}>button</button>
         <button onClick={value = 0}>button</button>
     
         <button onClick={console.log('clicked the button')}>
           button
         </button>
     
         <button onClick={setValue(0)}>button</button>
     
         
         
         // Will Work
         <button onClick={() => console.log('clicked the button')}>
           button
         </button>
     
         <button onClick={() => setValue(0)}>button</button>
     
         // See Below
         <button onClick={handleClick}>button</button>
     
         const App = () => {
           const [value, setValue] = useState(10)
         
           const handleClick = () =>
             console.log('clicked the button')
         
           return (
             <div>
               {value}
               <button onClick={handleClick}>button</button>
             </div>
           )
         }
     
     
     const App = () => {
       const [value, setValue] = useState(10)
     
       const handleClick = () => {
         console.log('clicked the button')
         setValue(0)
       }
     
       return (
         <div>
           {value}
           <button onClick={handleClick}>button</button>
         </div>
       )
     }
     
     
     
     FUNCTION IN A FUNCTION
     
       // These are the same
     <button onClick={setToValue(value + 1)}>increment</button>
     <button onClick={() => setToValue(value + 1)}>increment</button>