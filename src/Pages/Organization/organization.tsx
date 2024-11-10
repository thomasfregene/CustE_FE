import { useState } from "react";
import CreateOrganization from "./CreateOrganization";
import { CreateOrganization as CreateOrganizationType } from "../../Variables/Organization/CreateOrganization";
import GetOrganization from "./GetOrganization";
import OrganizationService from "../../Services/OrganizationService";
import fire from "../../Utils/Toast";

const Organization: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateOrganization = async (data: CreateOrganizationType) => {
    setLoading(true);
    try {
      const response = await OrganizationService.createOrganization(data);
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
      <h1 className="text-2xl font-bold mb-4">Organizations</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-grow"></div>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-primary text-white rounded shadow-md hover:bg-slate-600"
        >
          Create Organization
        </button>
      </div>

      {/* Table for organizations */}
      <div className="py-2">
        <GetOrganization />
      </div>

      {/* Modal for creating organization */}
      {isModalOpen && (
        <CreateOrganization
          onClose={handleCloseModal}
          onSubmit={handleCreateOrganization}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Organization;
