import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    //console.log('VALUE', value)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    //Käytetään useEffectiä hakemaan kaikki resurssit
    useEffect(() => {
        console.log('effect')
        axios
            .get(baseUrl)
            .then(response => {
                setResources(response.data)
            })

            .catch((error) => {
                console.log(error)
            })

    }, [baseUrl])

    //Uuden joko noten tai henkilön luominen
    //Alla purkkaviritys key ID:n lisäämiseksi ettei tule renderöitäessä warningia
    const create = (resource) => {
        axios
            .post(baseUrl, resource)
            //Otetaan vastauksena tuleva data talteen ja saadaan samalla json serverin
            //luoma data talteen ja sitä myöden key id renderöintiä varten
            .then(response =>
                setResources(resources.concat(response.data)))

    }
    //console.log('KAIKKI RESURSSIT', resources)
    const service = {
        create
    }

    return [
        resources, service
    ]
}