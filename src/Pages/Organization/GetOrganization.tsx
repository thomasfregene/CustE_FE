import React, { useEffect, useState } from "react";
import { OrganizationList as OrganizationListType } from "../../Variables/Organization/organizationList";
import Organization from "../../Services/OrganizationService";
import Pagination from "../../Utils/Pagination";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import fire from "../../Utils/Toast";

const GetOrganization: React.FC = () => {
  const [organizations, setOrganizations] = useState<OrganizationListType[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tenantIdToDelete, setTenantIdToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchOrganizations = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        startDate: "",
        endDate: "",
        pageSize,
        pageIndex: currentPage,
        search: debouncedSearchTerm,
        tenant: "",
      };

      const organizationsResponse = await Organization.getOrganization(params);
      if (organizationsResponse && organizationsResponse.data) {
        console.log("Fetched organizations:", organizationsResponse);
        const result =
          organizationsResponse.result ||
          organizationsResponse.data.result ||
          [];
        setOrganizations(result);
        setTotalPages(organizationsResponse.data.totalPages || 1);
      } else {
        console.log("Failed to fetch organizations.");
        setOrganizations([]);
      }
    } catch {
      setError("Failed to fetch organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [currentPage, debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setDebouncedSearchTerm(searchTerm);
  };

  // Open the confirmation dialog
  const handleDeleteClick = (tenantId: string) => {
    setTenantIdToDelete(tenantId);
    setIsDialogOpen(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (tenantIdToDelete) {
      try {
        const response = await Organization.deleteOrganizationById(
          tenantIdToDelete
        );
        setTenantIdToDelete(null);
        fire("success", response.message);
        setIsDialogOpen(false);
        fetchOrganizations();
      } catch {
        setError("Failed to delete organization");
        fire("error", "Failed to delete organization");
      }
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsDialogOpen(false);
    setTenantIdToDelete(null);
  };

  // Navigate to the individual organization page
  const handleViewClick = (tenantId: string) => {
    navigate(`/organization/${tenantId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Organization List</h2>

      {/* Search input and button */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search organization..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded w-full px-3 py-2"
          />
          <button
            onClick={handleSearchClick}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        <small className="text-primary">Search by name or email</small>
      </div>

      {organizations.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                Organization ID
              </th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                Address
              </th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                Phone Number
              </th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr key={org.organizationId} className="hover:bg-gray-100">
                <td className="border-b border-gray-300 px-4 py-2">
                  {org.organizationId}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {org.name}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {org.address}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {org.email}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {org.phoneNumber}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <button onClick={() => handleViewClick(org.tenantId)}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button onClick={() => handleDeleteClick(org.tenantId)}>
                    <i className="fas fa-trash ml-4 text-red-500"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No organizations found.</div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Confirmation dialog */}
      <Dialog
        isOpen={isDialogOpen}
        message="Are you sure you want to delete this organization?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default GetOrganization;
