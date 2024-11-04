import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import NavBar from './components/navbar/NavBar';
import TimeFilter from './components/TimeFilter/TimeFilter';
import WindowContainer from './components/WindowContainer/WindowContainer';
import DonatChartContainer from './components/DonatChartContainer/DonatChartContainer';
import TableContainer from './components/TableContainer/TableContainer';
import { useState, useEffect } from "react"
import CreateOperation from './components/CreateOperation/CreateOperation';
import EditOperation from './components/EditOperation/EditOperation';
import Modal from "./components/Modal/Modal"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalContent, setModalContent] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);

    return () => clearTimeout(timer);
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [existingOperation, setExistingOperation] = useState({
    operation_id: 1,
    category: "Groceries",
    amount: 50.0,
    description: "Weekly grocery shopping",
    operation_type: "spent",
  });

  const openCreateOperationModal = () => {
    setModalContent("CreateOperation")
    openModal();
  }
  const openEditOperationModal = () => {
    setModalContent("EditOperation")
    openModal();
  }

  const OnCloseModal = () => {
    closeModal()
  }

  const handleEditSubmit = (form) => {
  }

  return (
    <div>
      <div className={`loader_bg ${isLoading ? 's' : ''}`}>
        <div className="blob blob-0"></div>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="blob blob-5"></div>
      </div>


      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='body'>
          {modalContent == "CreateOperation" &&
            <CreateOperation closeModal={OnCloseModal} ></CreateOperation>
          }
          {modalContent == "EditOperation" &&
            <EditOperation existingOperation={existingOperation} setExistingOperation={setExistingOperation} onSubmit={handleEditSubmit} />
          }
        </div>
      </Modal>

      <div className="top_bar_container px-4 py-2 pt-4">
        <NavBar />
      </div>
      <div className='px-4'>
        {/* <TimeFilter /> */}
      </div>
      <div className="px-4 d-flex">
        <div className="stats_container p-2">
          <div className="statistics_container">
            <WindowContainer />
            <DonatChartContainer />
          </div>
        </div>
        <div className="flex-grow-1 p-2">
          <TableContainer openModal={openCreateOperationModal} />
        </div>
      </div>
    </div>
  );
}

export default App;
