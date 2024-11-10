import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrganizationService from "../../Services/OrganizationService";
import Back from "../components/Back";

interface OrganizationDetails {
  organizationId: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  tenantId: string;
  ipAddress: string;
}

const ViewOrganization: React.FC = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const [organization, setOrganization] = useState<OrganizationDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      if (tenantId) {
        try {
          const response = await OrganizationService.getOrganizationById(
            tenantId
          );
          if (response && response.data) {
            setOrganization(response.data);
          } else {
            setError("Organization not found");
          }
        } catch {
          setError("Failed to fetch organization details");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrganizationDetails();
  }, [tenantId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="py-2">
        <Back />
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-primary">
          Organization Details
        </h3>
        {organization && (
          <>
            <div className="text-center text-3xl font-bold mb-6">
              {organization.name}
            </div>
            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="px-4">
                <span className="text-xl font-bold text-gray-400">ID</span>
                <p>{organization.organizationId}</p>
              </div>
              <div className="px-4">
                <span className="text-xl font-bold text-gray-400">Name</span>
                <p>{organization.name}</p>
              </div>
              <div className="px-4">
                <span className="text-xl font-bold text-gray-400">Address</span>
                <p>{organization.address}</p>
              </div>
              <div className="px-4">
                <span className="text-xl font-bold text-gray-400">Email</span>
                <p>{organization.email}</p>
              </div>
              <div className="px-4">
                <span className="text-xl font-bold text-gray-400">
                  Phone Number
                </span>
                <p>{organization.phoneNumber}</p>
              </div>
              <div className="px-4">
                <span className="text-xl font-bold text-gray-400">
                  Tenant ID
                </span>
                <p>{organization.tenantId}</p>
              </div>
              <div className="px-4">
                <span className="text-xl font-bold text-gray-400">
                  IP Address
                </span>
                <p>{organization.ipAddress}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewOrganization;
