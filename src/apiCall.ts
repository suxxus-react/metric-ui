import axios from "axios";

async function doGet(url: string) {
  try {
    const resp = await axios.get(url);
    return resp.data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    console.error(e);
  }
}

async function doDelete(url: string) {
  try {
    const resp = await axios.delete(url);
    return resp.data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    console.warn("something wrong, unable to perform DELETE operation");
  }
}

async function doPut(url: string, body: unknown) {
  try {
    const resp = await axios.put(url, body);
    return resp.data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.warn("something wrong, unable to perform PUT operation");
  }
}

async function doPost(url: string, body: unknown) {
  try {
    const resp = await axios.post(url, body);
    return resp.data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.warn("something wrong, unable to perform POST operation");
  }
}

export { doGet, doDelete, doPut, doPost };
