export const restMethod = {
    DELETE: "DELETE",
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
}

export const baseUrl = "https://todo.crudful.com";;

export default class PointService {

    public getHeaders(additionalHeader?: { key: string, value: string }[]): Headers {
        
        let headers = new Headers();
        headers.append('cfAccessKey', '83654ebd0b0e4de5743cc4b1526662a3c7557894');
        if (additionalHeader) {
            for (let add of additionalHeader) {
                headers.append(add.key, add.value);
            }
        }
        return headers;
    }

    public async fetchDelete(endpoint: string) {
        return await fetch(baseUrl + endpoint, {method: restMethod.DELETE, headers: this.getHeaders()})
        .then(res=> {return res});
    }

    public async fetchGet(endpoint: string, id?: string) {
        return await fetch(baseUrl + endpoint, {method: restMethod.GET, headers: this.getHeaders(), cache: "no-store"})
        .then(res=> {return res.json()}).then(data => {return data}).catch(error => {console.log(error)});
    }

    public async fetchPost(endpoint: string, body: any) {
        return await fetch(baseUrl + endpoint, 
            {method: restMethod.POST, headers: this.getHeaders([{key:'Content-Type', value:'application/json'}]), body})
        .then(res=> {return res.json()}).then(data => {return data}).catch(error => {console.log(error)});
    }

    public async fetchPut(endpoint: string, body: any) {
        return await fetch(baseUrl + endpoint, 
            {method: restMethod.PUT, headers: this.getHeaders([{key:'Content-Type', value:'application/json'}]), body})
        .then(res=> {return res.json()}).then(data => {return data}).catch(error => {console.log(error)});
    }
}