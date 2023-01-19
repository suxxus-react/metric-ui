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

type CreateApi = {
  createData: unknown;
  createErr: string;
};

type UpdateDataApi = { url: string; body: unknown };

type CreateDataApi = { url: string; body: unknown };

export function useGetApi(): [GetApi, (a: string) => void] {
  //
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetch() {
      try {
        const resp = await axios.get(url);
        setData(resp.data);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setError("something wrong, unable to perform GET operation");
      }
    }

    if (url) {
      fetch();
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
    async function fetch() {
      try {
        const resp = await axios.delete(url);
        setDeleteData(resp.data);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setDeleteErr("something wrong, unable to perform DELETE operation");
      }
    }

    if (url) {
      fetch();
    }
  }, [url]);

  return [{ deleteData, deleteErr }, setUrl];
}

export function useUpdateApi(): [UpdateApi, (a: UpdateDataApi) => void] {
  const [{ url, body }, setUrl] = useState<UpdateDataApi>({
    url: "",
    body: "",
  });
  const [updateData, setUpdateData] = useState<unknown>();
  const [updateErr, setUpdateErr] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        const resp = await axios.put(url, body);
        setUpdateData(resp.data);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setUpdateErr("something wrong, unable to perform PUT operation");
      }
    }

    if (url) {
      fetch();
    }
  }, [url, body]);

  return [{ updateData, updateErr }, setUrl];
}

export function usePostApi(): [CreateApi, (a: CreateDataApi) => void] {
  const [{ url, body }, setUrl] = useState<CreateDataApi>({
    url: "",
    body: "",
  });

  const [createData, setCreateData] = useState<unknown>();
  const [createErr, setCreateErr] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        const resp = await axios.post(url, body);
        setCreateData(resp.data);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setCreateErr("something wrong, unable to perform POST operation");
      }
    }

    if (url) {
      fetch();
    }
  }, [url, body]);

  return [{ createData, createErr }, setUrl];
}
