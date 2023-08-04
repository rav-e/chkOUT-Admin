import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Switch from "@mui/material/Switch";
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Categoryview from '../../pages/list/categoryview/Categoryview';
import Categoryedit from '../../pages/list/categoryedit/Categoryedit';
import Box from '@mui/material/Box';


const Datatable = () => {

  //Disable switch
  //const label = { inputProps: { 'aria-label': 'Switch demo' } };
  //const [checked, setChecked] = React.useState(false);
  const RedSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: red[900],
      '&:hover': {
        backgroundColor: alpha(red[900], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: red[900],
    },
  }));
  

  async function handleStatus(id) {
    status(id)
    window.location.reload()

    
  }

  const status = async (id) => {
   
    let del = await axios.post(
        "http://localhost:8000/api/category/editStatus",
        { id }
      );
  };

  //end of disable  switch code
 
  async function handleView (id){
   
    
   return(
     <div>
       <Categoryview />
     </div>
     
   )
 }

 async function handleEdit (id){
 
   
  return(
    <div>
      <Categoryedit />
    </div>
    
  )
}

const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);



  const getAllCategory = async () => {
    var result = await fetch(
      "http://localhost:8000/api/category/getAllCategory"
    );
    var temp = await result.json();
    console.log(result);
    setCategory(temp);

  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "categoryName", headerName: "Category Name", width: 200 },
  ];

  //Delete function 
  async function handleDelete(id) {
    if (window.confirm("Want to delete?")) {
     // setCategory(category.filter((item) => item.id !== id));

      let del = await axios.post(
        "http://localhost:8000/api/category/deleteCategoryById",
        { id }
      );

      del = await del.data;
      var mssg=del.message
      if( mssg=="product"){
        alert("Unable to Delete you have product in these category ")
      }else if(mssg == "subcategory"){
        alert("Unable to Delete you have subcategory in these category ")
      }else{
        setCategory(category.filter((item) => item.id !== id));
      }
      
      getAllCategory();
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/categary/view/"+params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton"
              onClick={() => handleView(params.row.id)}>View</div>
            </Link>
            <Link to={"/categary/edit/"+params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton"
              onClick={() => handleEdit(params.row.id)}>Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            
          </div>
        );
      },
    },
  ];


  const actionStatus = [{
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return(
        <div className="cellAction" >
            <RedSwitch  checked={params.row.isActive==0 ? true :false}  onClick={() => handleStatus(params.row.id)}  inputProps={{ 'aria-label': 'controlled' }}/>
            <label >{params.row.isActive==0 ? "Disable" :"Enable"}</label>
        </div>
      )
    }
  }];



  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1><strong>Categories</strong></h1>
        <Link to="/categary/new" className="link">
          Add New Category
        </Link>
      </div>
      <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        className="datagrid"
        rows={category}
        columns={userColumns.concat(actionColumn).concat(actionStatus)}
        pageSize={13}
        rowsPerPageOptions={[13]}
        //checkboxSelection
      />
      </Box>
    </div>
  );
};

export default Datatable;
