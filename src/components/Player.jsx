import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    // how 2 way binding works here is that we create a useState which holds the name of the player
    const [playerName, setPlayerName] = useState(initialName)

    const [isEditing, setIsEditing] = useState(false)


    // we create a function that calls whenever our input field is updated or on every change.
    // event represents the value keyed in the input field whenever onChange is called.
    function handleChange(event) {
        //  when we want to update the value of a state we can use the set Function to update the value as how we learned
        setPlayerName(event.target.value)
    }

    function editName() {
        setIsEditing(editing => !editing)

        //only call the function when isEditing is truthy 
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }


    let nameDisplay = <span className='player-name' >{playerName}</span>
    let btnCaption = 'Edit'

    if (isEditing) {
        // we place the handleChange function in an onChange event listener which updates the playerName on every change
        nameDisplay = <input type="text" required value={playerName} onChange={handleChange} />
        btnCaption = 'Save'
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {nameDisplay}
                <span className="player-symbol" >{symbol}</span>
            </span>
            <button onClick={editName} >{btnCaption}</button>
        </li>
    )
}