import React, { useEffect, useState } from 'react';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader'

import useRequestData from '../../../hooks/useRequestData'

const CreateItems = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  const { data: dataShops, isLoading: isLoadingShops, error: errorShops, makeRequest: makeRequestShops } = useRequestData()

  const [itemsName, setItemsName] = useState()
  const [amount, setAmount] = useState()
  const [note, setNote] = useState()
  const [url, setUrl] = useState()
  const [shopName, setShopName] = useState()


  useEffect(() => {

    makeRequestShops("https://api.airtable.com/v0/appYNEDfeJbTNKyeL/Grocerystores?sort%5B0%5D%5Bfield%5D=Shopname",
      { "Authorization": "Bearer " + process.env.REACT_APP_Airtable, "Content-Type": "application/json" }
    )

  }, [])

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
          "Note": note,
          "URL": url,
          "Grocerystores": [
            shopName
          ]
        }
      })
    e.target.reset() //Tøm input felter efter oprettelse 
  }

  return (
    <>
      <h1>Opret en vare</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="" onChange={e => setItemsName(e.target.value)} placeholder='Skriv en vare' required />
        <input type="text" name="" id="" onChange={e => setAmount(e.target.value)} placeholder='Skriv mængde' required />
        <input type="text" name="" id="" onChange={e => setNote(e.target.value)} placeholder='Skriv note' />
        <input type="text" name="" id="" onChange={e => setUrl(e.target.value)} placeholder='Indsæt billede adresse' />

        <select onChange={e => setShopName(e.target.value)} defaultValue="DEFAULT">
          <option value="DEFAULT" disabled>Vælg en butik</option>
          {dataShops && dataShops.records.map(s =>
            <option key={s.id} value={s.id} >{s.fields.Shopname}</option>
          )
          }
        </select>
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
