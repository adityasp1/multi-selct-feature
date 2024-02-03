
import { useState, useEffect } from 'react'
import './App.css'


function App() {
   
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);


  // fetch('https://dummyjson.com/users/search?q=John')

  

  useEffect(() => {
    const fetchUsers = () => {
      if(searchTerm.trim() === "") {
      return ;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => {
        console.error(err)
      })
    };
    fetchUsers();
  },[searchTerm]);

  return(
  <div className='search-container'> 
    <div className="user-search-input">
      {/* pills */}
      {/* input field with search sugestions */}
      <div>
        <input type="text" value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder='search for a user...'/>
        {/* search suggestions */}
        <ul className='suggestionList'>{suggestions?.users?.map((user,index) => {
          return <li key={user.email}>
            <img src={user.image} alt={`{user.firstName} ${user.lastName}`} />
            <span>{user.firstName} {user.lastName}</span>
          </li>
        })}</ul>
      </div>
    </div>
     </div>
  )
  
} 

export default App
