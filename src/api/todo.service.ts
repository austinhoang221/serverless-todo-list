import { getAuthHeaders } from "./base.service";
import { APIResponseModel } from "./models/APIResponseModel";
import { CreateTodoRequestModel } from "./models/CreateTodoRequestModel";

const API_URL = import.meta.env.VITE_API_URL

export const GetListTodo = async (searchText?: string) => {
  const url = searchText ?  API_URL + `?search=${searchText}` : API_URL;
   try {
    const response = await fetch(url, {
        method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
     return json as APIResponseModel;
  } catch (error) {
    console.error(error);
  }
}

export const DeleteTodo = async (id: string) => {
   try {
    const response = await fetch(API_URL + `/${id}` , {
        method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
     return json as APIResponseModel;
  } catch (error) {
    console.error(error);
  }
}

export const UpdateTodo = async (id: string, payload: { [key: string]: string | boolean }) => {
   try {
    const response = await fetch(API_URL + `/${id}` , {
        method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)        
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
     return json as APIResponseModel;
  } catch (error) {
    console.error(error);
  }
}

export const CreateTodo = async (payload: CreateTodoRequestModel) => {
   try {
    const response = await fetch(API_URL, {
        method: 'POST',
             headers: getAuthHeaders(),
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json as APIResponseModel;
  } catch (error) {
    console.error(error);
  }
}