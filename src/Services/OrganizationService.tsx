import APICall from "../Utils/ApiCall";
import { CreateOrganization } from "../Variables/Organization/CreateOrganization";

interface GetOrganizationParams {
  startDate?: string;
  endDate?: string;
  pageSize: number;
  pageIndex: number;
  search?: string;
  tenant?: string;
}

export default class OrganizationService {
  // Create Organization
  static createOrganization = async (data: CreateOrganization) => {
    return await APICall({
      Url: "/api/v1/Organization/internal/create",
      Method: "POST",
      Data: data,
    });
  };

  // List organization
  static getOrganization = async ({
    startDate,
    endDate,
    pageSize,
    pageIndex,
    search,
    tenant,
  }: GetOrganizationParams) => {
    let url = `/api/v1/Organization/internal/list?pageSize=${pageSize}&pageIndex=${pageIndex}`;

    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    if (tenant) url += `&tenant=${tenant}`;
    if (search) url += `&search=${search}`;
    const response = await APICall({ Url: url, Method: "GET" });

    if (!response) {
      console.error("Failed to fetch organizations");
      return null;
    }

    return response;
  };

  // Get organization by id
  static getOrganizationById = async (tenantId: string) => {
    return await APICall({
      Url: `/api/v1/Organization/internal/details/${tenantId}`,
      Method: "GET",
      Data: tenantId,
    });
  };

  // Delete organization by id
  static deleteOrganizationById = async (tenantId: string) => {
    return await APICall({
      Url: `/api/v1/Organization/internal/delete/${tenantId}`,
      Method: "DELETE",
      Data: tenantId,
    });
  };
}
