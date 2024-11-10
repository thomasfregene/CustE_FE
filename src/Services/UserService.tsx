import APICall from "../Utils/ApiCall";
import { CreateUser } from "../Variables/Users/CreateUser";

interface GetUserParams {
  startDate?: string;
  endDate?: string;
  pageSize: number;
  pageIndex: number;
  search?: string;
  tenant?: string;
}

interface UserDetails {
  tenantId: string;
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  emailAddress: string;
  phoneNumber: string;
}

export default class UserService {
  // Create User

  static createUser = async (data: CreateUser) => {
    return await APICall({
      Url: "/api/v1/User/internal/create",
      Method: "POST",
      Data: data,
    });
  };

  //   Get User

  static getUser = async ({
    startDate,
    endDate,
    pageSize,
    pageIndex,
    search,
    tenant,
  }: GetUserParams) => {
    let url = `/api/v1/User/internal/list?pageSize=${pageSize}&pageIndex=${pageIndex}`;

    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    if (search) url += `&search=${search}`;
    if (tenant) url += `&tenant=${tenant}`;

    // Note: tenantId is managed in APICall; no need to pass it here
    const response = await APICall({ Url: url, Method: "GET" });

    if (!response) {
      console.error("Failed to fetch organizations");
      return null; // Handle error as needed
    }

    return response;
  };

  // Fetch User by ID
  static getUserById = async (userId: string) => {
    return await APICall({
      Url: `/api/v1/User/internal/getuserbyid?userId=${userId}`,
      Method: "GET",
    });
  };

  //   Update user
  static updateUser = async (data: UserDetails) => {
    return await APICall({
      Url: `/api/v1/User/internal/update`,
      Method: "PUT",
      Data: data,
    });
  };

  static activateUser = async (userId: string) => {
    return await APICall({
      Url: `/api/v1/User/internal/activate`,
      Method: "PUT",
      Data: { userId },
    });
  };
}
