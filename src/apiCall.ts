import { useState, useEffect } from "react";
import axios from "axios";

type GetApi = {
  data: unknown;
  error: string;
};

type DeleteApi = {
  deleteData: unknown;
  deleteErr: string;
};

type UpdateApi = {
  updateData: unknown;
  updateErr: string;
};
export function useGetApi(): [GetApi, (a: string) => void] {
  //
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(url);
        setData(resp.data);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setError("something wrong, unable to perform GET operation");
      }
    }

    if (url) {
      fetchData();
    }
  }, [url]);

  return [{ data, error }, setUrl];
}

export function useDeleteApi(): [DeleteApi, (a: string) => void] {
  //
  const [url, setUrl] = useState<string>("");
  const [deleteData, setDeleteData] = useState<unknown>();
  const [deleteErr, setDeleteErr] = useState<string>("");

  useEffect(() => {
    async function deleteData() {
      try {
        const resp = await axios.delete(url);
        setDeleteData(resp.data);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setDeleteErr("something wrong, unable to perform DELETE operation");
      }
    }

    if (url) {
      deleteData();
    }
  }, [url]);

  return [{ deleteData, deleteErr }, setUrl];
}

export function useUpdateApi(): [
  UpdateApi,
  (body: unknown) => void,
  (a: string) => void
] {
  //
  const [url, setUrl] = useState<string>("");
  const [updateBody, setUpdateBody] = useState<unknown>({});
  const [updateData, setUpdateData] = useState<unknown>();
  const [updateErr, setUpdateErr] = useState("");

  useEffect(() => {
    async function updateData() {
      try {
        const resp = await axios.put(url, updateBody);
        setUpdateData(resp.data);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setUpdateErr("something wrong, unable to perform PUT operation");
      }
    }

    if (url) {
      updateData();
    }
  }, [url, updateBody]);

  return [{ updateData, updateErr }, setUpdateBody, setUrl];
}
