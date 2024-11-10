import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CreateUser as CreateUserType } from "../../Variables/Users/CreateUser";

interface UserFormProps {
  onClose: () => void;
  onSubmit: (data: CreateUserType) => Promise<void>;
  loading: boolean;
}

const CreateUser: React.FC<UserFormProps> = ({
  onClose,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState<CreateUserType>({
    tenantId: "",
    firstName: "",
    lastName: "",
    middleName: "",
    emailAddress: "",
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
        tenantId: "",
        firstName: "",
        lastName: "",
        middleName: "",
        emailAddress: "",
        phoneNumber: "",
      });
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md  w-1/2 max-w-lg relative md:max-w-md md:w-3/4">
        <h2 className="text-lg text-center font-semibold mb-4 uppercase">
          Create User
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
            <label className="block mb-1" htmlFor="tenantId">
              Tenant ID
            </label>
            <input
              type="text"
              name="tenantId"
              id="tenantId"
              value={formData.tenantId}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2 border-1 border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="firstName">
              Firstname
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2 border-1 border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="lastName">
              Lastname
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2 border-1 border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="middleName">
              Middlename
            </label>
            <input
              type="text"
              name="middleName"
              id="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2 border-1 border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="emailAddress">
              Email Address
            </label>
            <input
              type="email"
              name="emailAddress"
              id="emailAddress"
              value={formData.emailAddress}
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
              {loading ? <span>Creating...</span> : <span>Create User</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
