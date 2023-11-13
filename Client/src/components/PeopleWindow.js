import React from 'react'
import { useEffect } from 'react'

const PeopleWindow = ({selectToon, selectedToon}) => {
    // selectedToon is an integer
    // selectToon is a function in the app component

    useEffect(() => {
        highlightSelectedToon(selectedToon)
    }, [])


    // Thoughts on designing selection of toon
    // selectToon is a function in the app level that can change the state so the page can rerender
    // change selected toon will be a function that is launched upon clicking div element that changes
    //    the current selected toon, will call select toon with the toon_id
    // highlightSelectedToon will just change the color panel of a particular selected toon
        const changeSelectedToon = (event) => {
            const clickedToon = event.target
            dehighlightSelectedToon() // returns old selected toon to original color
            highlightSelectedToon(clickedToon.id) // highlights newly selected toon
            selectToon(clickedToon.id)
            
        }

    // Changes background color
    // LEFT OFF HERE AT SELECTING THE QUERY
    const highlightSelectedToon = (toonID) => {
        let newToon = document.getElementById(toonID)
        newToon.style.backgroundColor = 'rgb(51, 40, 99)'
    }
    
    const dehighlightSelectedToon = () => {
        let oldToon = document.getElementById(selectedToon)
        oldToon.style.backgroundColor = 'rgb(21, 10, 59)'
    }


    return (
        <div className='people_window'>
             <div className='toon_user_people_window' >
                <div className='toon_user_panel' onClick={changeSelectedToon} id='10'>
                    <img src="/images/spongebob_portrait.png" alt="spongebob" className="person_icon"/> 
                    Spongebob
                </div>
                <div className='toon_user_panel' onClick={changeSelectedToon} id='20'>
                    <img src="/images/eeyore_portrait2.png" alt="eeyore" className="person_icon"/> 
                    Eeyore
                </div>
                <div className='toon_user_panel' onClick={changeSelectedToon} id='30'>
                    <img src="/images/hooded_figure_art.png" alt="hooded_figure" className="person_icon"/> 
                    NoName356 
                </div>

             </div>
             
        </div>
    )
}

export default PeopleWindow