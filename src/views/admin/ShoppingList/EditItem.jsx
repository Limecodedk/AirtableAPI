import React, { useEffect, useState } from 'react';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader'
import { useParams } from 'react-router-dom';

import useRequestData from '../../../hooks/useRequestData'

const EditItem = () => {

  const { id } = useParams()

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  const { data: dataShops, isLoading: isLoadingShops, error: errorShops, makeRequest: makeRequestShops } = useRequestData()

  const [itemsName, setItemsName] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [url, setUrl] = useState()
  const [shopName, setShopName] = useState()


  useEffect(() => {

    // hent oplysninger på varen der skal rettets ud fra id
    makeRequest("https://api.airtable.com/v0/appYNEDfeJbTNKyeL/Need/" + id,
      {
        "Authorization": "Bearer " + process.env.REACT_APP_Airtable,
      })

    //Hent alle butikker
    makeRequestShops("https://api.airtable.com/v0/appYNEDfeJbTNKyeL/Grocerystores?sort%5B0%5D%5Bfield%5D=Shopname",
      { "Authorization": "Bearer " + process.env.REACT_APP_Airtable, "Content-Type": "application/json" }
    )

  }, []);


  //Når vare er hentet - ligger i data
  useEffect(() => {
    if (data) {
      setItemsName(data.fields.Item)
      setAmount(data.fields.Amount)
      setNote(data.fields.Note)
      setUrl(data.fields.URL)
      setShopName(data.fields.Grocerystores[0])
    }
  }, [data])


  const handleSubmit = e => {
    e.preventDefault();

    makeRequest("https://api.airtable.com/v0/appYNEDfeJbTNKyeL/Need/" + id,
      {
        "Authorization": "Bearer " + process.env.REACT_APP_Airtable,
        "Content-Type": "application/json"
      }, null, "PATCH",
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
  }

  return (
    <>
      <h1>Ret vare - ID: {id}</h1>
      {isLoading && <Loader />}

      {error && <Error error={error} />}

      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="" id="" value={itemsName ? itemsName : ''} onChange={e => setItemsName(e.target.value)} placeholder={'skriv et navn'} required />
        <input type="text" name="" id="" value={amount ? amount : ''} onChange={e => setAmount(e.target.value)} placeholder='Skriv mængde' required />
        <input type="text" name="" id="" value={note ? note : ''} onChange={e => setNote(e.target.value)} placeholder='Skriv note' />
        <input type="text" name="" id="" value={url ? url : ''} onChange={e => setUrl(e.target.value)} placeholder='Indsæt link til billede' />
        <select onChange={e => setShopName(e.target.value)} value={shopName ? shopName : "DEFAULT"}>
          <option value="DEFAULT" disabled>Vælg en butik</option>
          {dataShops && dataShops.records.map(s =>
            <option key={s.id} value={s.id} >{s.fields.Shopname}</option>
          )
          }
        </select>
        {
          url && <td ><img src={url} alt="" width={'150px'} height={'100px'} /></td>
        }
        <button type='submit'>Ret vare</button>
      </form>

      {/* {
        data &&
        <article>
          {data.fields.Item} er rettet!
        </article>
      } */}
    </>
  )
}

export default EditItem