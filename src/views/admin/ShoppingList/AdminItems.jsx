import React, { useEffect } from 'react';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader'
import useRequestData from '../../../hooks/useRequestData'
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const AdminItems = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  const { data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, makeRequest: makeRequestDelete } = useRequestData()

  useEffect(() => {

    makeRequest("https://api.airtable.com/v0/appYNEDfeJbTNKyeL/Need/",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_Airtable
      })

  }, [dataDelete])

  const handleDelete = (id, varenavn) => {

    if (window.confirm("Wow er du sikker på at du vil slette " + varenavn + "?")) {
      makeRequestDelete("https://api.airtable.com/v0/appYNEDfeJbTNKyeL/Need/" + id,
        {
          "Authorization": "Bearer " + process.env.REACT_APP_Airtable
        }, null, "DELETE")
    }
  }

  return (
    <>
      <h1>Indkøbsseddel</h1>
      {isLoading && <Loader />}

      {error && <Error />}


      <table>
        <thead>
          <tr>
            <th>Produkt:</th>
            <th>Antal:</th>
            <th>Note:</th>
            <th>ID nummer:</th>
            <th>Ret</th>
            <td>Slet</td>
          </tr>
        </thead>
        <tbody>
          {
            data && data.records.map(s =>

              <tr key={s.id}>
                <td>{s.fields.Item}</td>
                <td>{s.fields.Amount}</td>
                <td>{s.fields.Note}</td>
                <td>{s.id}</td>
                <td><Link to={"/admin/edititems/" + s.id} ><FiEdit size={"1.5em"} /></Link></td>
                <td><MdOutlineDelete size={"1.7em"} color='darkred' onClick={() => handleDelete(s.id, s.fields.Item)} /></td>
              </tr>
            )
          }
        </tbody >
      </table>

    </>
  )
}

export default AdminItems
