import axios from "axios";

async function doGet(url: string) {
  try {
    const resp = await axios.get(url);
    return resp.data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error(`unable to preform GET operation -> ${err.message}`);
  }
}

async function doDelete(url: string) {
  try {
    const resp = await axios.delete(url);
    return resp.data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error(`Unable to perform DELETE operation -> ${err.message}`);
  }
}

async function doPut(url: string, body: unknown) {
  try {
    const resp = await axios.put(url, body);
    return resp.data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error(`Unable to perform PUT operation -> ${err.message}`);
  }
}

async function doPost(url: string, body: unknown) {
  try {
    const resp = await axios.post(url, body);
    return resp.data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error(`Unable to perform POST operation -> ${err.message}`);
  }
}

export { doGet, doDelete, doPut, doPost };
