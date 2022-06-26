const fetchData = async (url: string, requestInit: any, successCallback: any, failCallback: any) => {
    return await fetch(url, requestInit)
        .then(validateResponse)
        .then(parseResponseToJSON)
        .then(successCallback)
        .catch(failCallback);
};

const validateResponse = (response: any) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const parseResponseToJSON = async (response: any) => {
    return await response.json();
};

export const getPropertyDataByFilter = async (filteredInfo: any) => {

    const url: string = "api/properties";

    const requestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }

    const successCallback = (response: any) => {
        if (!filteredInfo.length) {
            return response.data;
        }
        const set = new Set(filteredInfo);
        const properties: Common.Property[] = response.data;
        const filtedData = properties.filter(property => set.has(property.state));
        return filtedData;
    };

    const failCallback = (err: Error) => {
        console.log(err);
        return [];
    }

    return await fetchData(url, requestInit, successCallback, failCallback);
}