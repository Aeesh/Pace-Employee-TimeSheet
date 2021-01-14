import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import Table from '../../layouts/Table';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import { getAssignedTasks } from '../../../../actions/task/assignedTaskAction';
import { useDispatch, useSelector } from 'react-redux';
// Loader
import Loader from '../../../loader/Loader';

const AssignedTasks = () => {
  const {assignedTasks, isFetching } = useSelector(state => state.assignedTasks)
  const dispatch = useDispatch();
  const history = useHistory();

  // const [taskState, setTaskState] = useState();
  // useEffect(() => {
  //   setTaskState(assignedTasks)
  // }, [])

  useEffect(() => {
    dispatch(getAssignedTasks())
  }, [dispatch])


  // styles each row
  const rowStyle = {
    cursor: 'pointer'
  }

  // routes to full task details page on double click
  const taskDetails =  {
    onClick: (e, row, rowIndex) =>
    {
        history.push(`/dashboard/task/view-task/${row.id}`)
    }
  };

  // If the task list is been fetched from the server or not mounted on the ui, show the loader
  // if(isFetching){
  //   return(
  //       <>
  //           <Loader />
  //       </>
  //   )
  // }
  return (
    <div >

      <Table
        keyField='id'
        title = "Assigned Tasks"
        data={assignedTasks }
        columns={taskHeader}
        bordered= { false }
        // selectRow = {selectRow}
        enableSearch = { true }
        pagination = { paginationFactory() }
        // controlHeader = { navigate }
        rowEvents = { taskDetails }
        noDataIndication={'No available task'}
        filter={ filterFactory() }
        rowStyle={ rowStyle }
      />
    </div>
  )
}

const taskHeader = [

  {
    dataField: 'taskName',
    text: 'Title',
    headerAttrs: {
      hidden:true
    }
  },
  {
    dataField: 'dueDate',
    text: 'Due Date',
    headerAttrs: {
      hidden:true
    }
  },
  {
    dataField: 'documentsAttached',
    text: 'Attachment',
    headerAttrs: {
      hidden:true
    }
  },
];

export default AssignedTasks;