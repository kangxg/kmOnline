import ETTBaseModel from './ETTBaseModel';
import NetworkUrl from "../res/values/ETTURLConfig";
import {DataManager} from '../res/values/ETTConfig';

export default class ETTRequestModel extends ETTBaseModel {

    MULTIPART = "multipart/form-data";
    URLENCODED = "application/x-www-form-urlencoded";


    _path: String = '';
    _method: string = '';
    _bodyData;
    _params = {};
    _headers = {
        'Accetp': 'application/json',
        'Content-Type': this.URLENCODED
    };

    get method() {
        return this._method;
    }

    set method(method) {
        this._method = method;
    }

    get path() {
        return this._path;
    }

    set path(url) {
        this._path = url;
    }

    get params() {
        return this._params;
    }

    set params(params) {
        this._params = params;
    }

    get headers() {
        return this._headers;
    }

    set headers(headers) {
        this._headers = headers;
    }

    set header(header) {
        Object.keys(header).forEach(k => {
            if (header.hasOwnProperty(k)) {
                this._headers[k] = header[k];
            }
        })
    }

    get body() {
        if (this.isMultipart()) {
            let fd = new FormData();
            Object.keys(this._params).forEach(k=>fd.append(k, this._params[k]))
            return fd;
        } else {
            return this._bodyData;
        }
    }

    set body(body) {
        if (typeof body === "string") {
            this._bodyData = body;
        } else {
            parr = [];
            Object.keys(body).forEach(k => parr.push(k + '=' + body[k]))
            this._bodyData = parr.join('&')
        }
    }

    setPath(path) {
        this._path = path;
        return this;
    }

    setMethod(method) {
        this._method = method;
        return this;
    }

    addParam(param) {
        if (!this._params) {
            this._params = {};
        }
        Object.keys(param).forEach(k => {
            if (param.hasOwnProperty(k)) {
                this._params[k] = param[k];
            }
        });
        this.body = this._params;
        return this;
    }

    addHeader(header) {
        if (!this._headers) {
            this._headers = {}
        }
        Object.keys(header).forEach(k => {
            if (header.hasOwnProperty(k)) {
                this._headers[k] = header[k];
            }
        });
        return this;
    }


    get baseToken() {
        return NetworkUrl.base_header
    }

    get refreshToken() {
        return 'Bearer ' + DataManager._userModel.refresh_token
    }

    get accessToken() {
        return 'Bearer ' + DataManager._userModel.access_token
    }

    get fetchBody() {
        let requestOptional = {
            method: this._method,
            headers: this._headers,
            body: this.body
        };
        return requestOptional;
    }

    get _getInfo() {
        return this.fetchBody;
    }

    isMultipart() {
        if (this._headers.hasOwnProperty('Content-Type')) {
            if (this._headers["Content-Type"] === "multipart/form-data") {
                return true;
            }
        }
        return false;
    }
    getKmRequestPath()
    {
        return  ETTURL.base_url + this._path;
    }
}