import React, { useState } from "react";
import { CreateOrganization as CreateOrganizationType } from "../../Variables/Organization/CreateOrganization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface OrganizationFormProps {
  onClose: () => void;
  onSubmit: (data: CreateOrganizationType) => Promise<void>;
  loading: boolean;
}

const CreateOrganization: React.FC<OrganizationFormProps> = ({
  onClose,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState<CreateOrganizationType>({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      setError("Failed to create user. Please try again."); // Set error message on failure
      setFormData({
        // Reset form data
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
      });
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md  w-1/2 max-w-lg relative md:max-w-md md:w-3/4">
        <h2 className="text-lg text-center font-semibold mb-4 uppercase">
          Create Organization
        </h2>
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-primary text-2xl hover:text-gray-700"
          aria-label="Close Modal"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2 border-1 border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2 border-1 border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2 border-1 border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2 border-1 border-primary"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary shadow-md text-white rounded px-4 py-2 hover:bg-slate-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {" "}
              {loading ? (
                <span>Creating...</span>
              ) : (
                <span>Create Organization</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
