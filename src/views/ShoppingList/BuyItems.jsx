import React, { useEffect } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'

const BuyItems = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {

    makeRequest("https://api.airtable.com/v0/appYNEDfeJbTNKyeL/Need/",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_Airtable
      })


  }, [])

  return (
    <>
      <h1>Indkøbsseddel Airtable</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {

        data && data.records.map(s =>
          <article>
            <table>
              <tr>
                <th>Produkt:</th>
                <th>Antal:</th>
                <th>Note:</th>
                <th>Butik</th>
              </tr>
              <tr>
                <td>{s.fields.Item}</td>
                <td>{s.fields.Amount}</td>
                <td>{s.fields.Note}</td>
                <td>{s.fields.shopname}</td>

                {
                  s.fields.URL && <td ><img src={s.fields.URL} alt="" width={'150px'} height={'100px'} /></td>
                }

              </tr>
            </table>
          </article>
        )
      }

    </>
  )
}

export default BuyItems
