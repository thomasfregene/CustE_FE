import CreateUser from "./CreateUser";
import GetUser from "./GetUser";
import { useState } from "react";
import { CreateUser as CreateUserType } from "../../Variables/Users/CreateUser";
import fire from "../../Utils/Toast";
import UserService from "../../Services/UserService";

const Users: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateOrganization = async (data: CreateUserType) => {
    setLoading(true);
    try {
      const response = await UserService.createUser(data);
      console.log("API Response:", response);

      if (response.status) {
        fire("success", response.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        handleCloseModal();
      } else {
        fire("error", "Failed to create organization: " + response.message);
      }
    } catch (error) {
      console.error("Error creating organization:", error);
      fire("error", "Failed to create organization");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-grow"></div>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-primary text-white rounded shadow-md hover:bg-slate-600"
        >
          Create User
        </button>
      </div>

      {/* Table for Users */}
      <div className="py-2">
        <GetUser />
      </div>

      {/* Modal for creating users */}
      {isModalOpen && (
        <CreateUser
          onClose={handleCloseModal}
          onSubmit={handleCreateOrganization}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Users;
