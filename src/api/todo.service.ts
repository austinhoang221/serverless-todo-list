import { APIResponseModel } from "./models/APIResponseModel";
import { CreateTodoRequestModel } from "./models/CreateTodoRequestModel";

const API_URL = import.meta.env.VITE_API_URL
const accessToken = JSON.parse(localStorage.getItem('context')!)?.accessToken
const  headers=  {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + accessToken
        }
export const GetListTodo = async () => {
   try {
    const response = await fetch(API_URL, {
        method: 'GET',
      headers: headers,
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
      headers: headers,
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
      headers: headers,
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
             headers: headers,
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