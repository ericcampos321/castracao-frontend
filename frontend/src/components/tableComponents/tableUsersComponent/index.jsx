import React from "react";
import { useState } from "react";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { Table } from "@mui/material";
import { Paper } from "@mui/material";
import DeleteConfirmComponent from "../../deleteConfirmComponent";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserFormComponent from "../../registerFormComponent/userFormComponent";


export const TableUsersComponent = ({ data, columns }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [idUser, setIdUser] = useState('');

  const openDeleteConfirm = (e, data ,id) => {
    e.preventDefault();
    setIdUser(id);
    setDeleteConfirm(true);
  }

  const openUpdate = (e, data, id) => {
    e.preventDefault();
    setIdUser(id);
    setOpenModalUpdate(true);
  }

  const closeModalConfirmDelete = () => {
    setDeleteConfirm(false);
}

const closeModalUpdate = () => {
  setOpenModalUpdate(false);
}


  return (
    <div style={{ width: "100%" }}>
      <TableContainer sx={{ border: '1px solid #751b1b', padding: '10px', maxHeight: 530  }} component={Paper} className="table-container">
        <Table stickyHeader>
          <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell style={{ color: '#751b1b', fontWeight: 'bold', textTransform: 'uppercase' }} align="center" key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id} sx={{ border: 0 }} hover>
              <TableCell>
                <div id="buttons" style={{ display: "flex" }}>
                  <button style={{ marginRight: "10px", cursor: "pointer", color: "blue", border: "none", background: "none" }}><EditIcon style={{ cursor: 'pointer', fontSize: 17 }} onClick={(e) => openUpdate(e, row, row._id)}/></button>
                  <button style={{ marginRight: "10px", cursor: "pointer", color: "red", border: "none", background: "none" }}><DeleteIcon style={{ cursor: 'pointer', fontSize: 17 }} onClick={(e) => openDeleteConfirm(e, row._id)} /></button>
                  <button style={{ marginRight: "10px", cursor: "pointer", color: "orange", border: "none", background: "none" }}><RemoveRedEyeIcon style={{ cursor: 'pointer', fontSize: 17 }} /></button>
                </div>
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>{row.idUser}</TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>{row.name}</TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>{row.email}</TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>{row.permissions?.name_permission || "Permissão não encontrada"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      {deleteConfirm ? <DeleteConfirmComponent operation="user" msg='Tem certeza que deseja deletar esse usuário ?' id={idUser} onClose={closeModalConfirmDelete} /> : null}
      {openModalUpdate ? <UserFormComponent operation="update" id={idUser} onClose={closeModalUpdate} /> : null}
    </div>
  );
};
