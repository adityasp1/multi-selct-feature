import { useState, useEffect, useRef } from "react";
import "./App.css";
import Pill from "./components/pill";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const inputRef = useRef(null)

  // fetch('https://dummyjson.com/users/search?q=John')

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === "") {
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error(err);
        });
    };
    fetchUsers();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
   if(e.key === "Backspace" && e.target.value ==="" && selectedUsers.length > 0) {
        const lastUser = selectedUsers[selectedUsers.length-1];
        handleRemoveUser(lastUser);
        setSuggestions([]);
   }
  }

  

  return (
    <div className="search-container">
      <div className="user-search-input">
        {/* pills */}
        {selectedUsers.map((user) => {
            return (
               <Pill key={user.email}
            image={user.image}
            text={`${user.firstName} ${user.lastName}`}
            onClick={() => handleRemoveUser(user)}/>
            );
          })}
      
        {/* input field with search sugestions */}
        <div>
          <input
          ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search for a user..."
            onKeyDown={handleKeyDown}
          />
          {/* search suggestions */}
          <ul className="suggestionList">
            {suggestions?.users?.map((user, index) => {
              return !selectedUserSet.has(user.email) ? (
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img
                    src={user.image}
                    alt={`{user.firstName} ${user.lastName}`}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : <></>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
