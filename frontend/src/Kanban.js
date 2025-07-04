import React, { useState, useEffect } from 'react';
import axiosInstance from './axios'; // Make sure axios.js exports axios.create(...)
import Modal from './Modal';
import './Kanban.css';

const KanbanBoard = () => {
  const [board, setBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/api/department/departments');
      console.log('Data fetched:', response.data);

      const deptMap = new Map();
      response.data.forEach(dept => {
        const name = dept.name.trim().toLowerCase();
        const tasks = dept.supportQueries.map(query => ({
          id: query._id,
          title: query.queryText
        }));

        if (!deptMap.has(name)) {
          deptMap.set(name, {
            _id: dept._id,
            name: dept.name,
            tasks
          });
        } else {
          const existing = deptMap.get(name);
          existing.tasks.push(...tasks);
        }
      });

      setBoard(Array.from(deptMap.values()));
    } catch (error) {
      console.error('Error fetching departments:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddQueryClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitQuery = async (queryText) => {
    setIsModalOpen(false);
    try {
      await axiosInstance.post('/api/query/createQuery', { queryText });
      await fetchDepartments(); // Refresh board after adding query
    } catch (error) {
      console.error('Failed to add query:', error);
      setError(error);
    }
  };

  const handleCreateDepartment = async (departmentName) => {
    try {
      const response = await axiosInstance.post('/api/department/createDepartment', {
        name: departmentName
      });
      if (response.data) {
        setBoard([...board, response.data]);
      }
    } catch (error) {
      console.error('Failed to create department:', error);
      setError(error);
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    try {
      await axiosInstance.delete(`/api/department/departments/${departmentId}`);
      setBoard(board.filter(dept => dept._id !== departmentId));
    } catch (error) {
      console.error('Failed to delete department:', error);
      setError(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!board.length) return <div>No data found. Click "Add Query" to create a new query.</div>;

  return (
    <>
      <div className="kanban-header">
        <button onClick={handleAddQueryClick}>Add Query</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitQuery} />
      <div className="title">Query Board</div>
      <div className="kanban-board">
        {board.map(department => (
          <div key={department._id} className="kanban-column">
            <h2>{department.name}</h2>
            {department.tasks.map(task => (
              <div key={task.id} className="kanban-task">
                <p>{task.title}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default KanbanBoard;
