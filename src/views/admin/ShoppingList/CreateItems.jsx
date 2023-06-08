import React, { useEffect, useState } from 'react';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader'

import useRequestData from '../../../hooks/useRequestData'

const CreateItems = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  const [itemsName, setItemsName] = useState()
  const [amount, setAmount] = useState()
  const [note, setNote] = useState()

  const handleSubmit = e => {
    e.preventDefault();

    makeRequest("https://api.airtable.com/v0/appYNEDfeJbTNKyeL/Need/",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_Airtable,
        "Content-Type": "application/json"
      }, null, "POST",
      {
        "fields": {
          "Item": itemsName,
          "Amount": amount,
          "Note": note
        }
      })
    e.target.reset() //Tøm input felter efter oprettelse 
  }

  return (
    <>
      <h1>Indkøbsseddel Airtable</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="" onChange={e => setItemsName(e.target.value)} placeholder='Skriv en vare' required />
        <input type="text" name="" id="" onChange={e => setAmount(e.target.value)} placeholder='Skriv mængde' required />
        <input type="text" name="" id="" onChange={e => setNote(e.target.value)} placeholder='Skriv note' />
        <button type='submit'>Opret vare</button>
      </form>

      {
        data &&

        <article>
          {data.fields.Item} er oprettet
        </article>
      }

    </>
  )
}

export default CreateItems
