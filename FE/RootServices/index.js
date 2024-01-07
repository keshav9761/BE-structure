import axios from "axios";
import apiEndPoints from "./apiEndPoints";
const APIENDPOINTS = apiEndPoints;
const BASEURL = 'http://localhost:9000';

class RootServices {
    ENDPOINTS = APIENDPOINTS;
    constructor() {
        // REQUEST
        axios.interceptors.request.use((config) => {
            console.log("Req------->", config);
            config.headers = {
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
            document.getElementById('global-loader-id').style.display = "block";
            return config;
        })

        // RESPONSE 
        axios.interceptors.response.use((config) => {
            console.log("Res------->", config)
            document.getElementById('global-loader-id').style.display = "none";
            return config;
        })
    }

    getReq = async (endPoint, params, as) => {
        try {
            // Construct the URL with parameters
            if (params && as == 'asQuery') {
                const queryUrl = new URL(`${BASEURL}${endPoint}`);
                queryUrl.search = new URLSearchParams(params).toString();
                return await axios.get(queryUrl);
            } else if (params && as == 'asParams') {
                const endPointKeys = endPoint?.split('/')
                const newEndPoint = endPointKeys.reduce((acc, v) => {
                    if (v.includes(':')) {
                        const key = v.replace(/:/g, '');
                        acc = acc?.concat(`/${params[key]}`)
                    } else {
                        acc = acc?.concat(`/${v}`);
                    }
                    return acc
                }, "")

                let paramUrl = newEndPoint.replace(/\/\//g, '');
                return await axios.get(`${BASEURL}/${paramUrl}`);
            }
        }
        catch (err) {
            console.log("getREQ", err)
        }
    }

    postReq = async (endPoint, body) => {
        try {
            return await axios.post(`${BASEURL}${endPoint}`, body)
        }
        catch (err) {
            console.log("postREQ", err)
            document.getElementById('global-loader-id').style.display = "none";
            return err
        }
    }
}
const rootServices = new RootServices()
export default rootServices;