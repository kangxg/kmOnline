import ETTDatabaseStores  from './ETTDatabaseStores';
import ETTDefalultStorage from './ETTDefaultStorage';
import {defaultExpires} from "../res/values/ETTConfig"

export default class  ETTDataProcessingManager
{
    _dataBaseStores:ETTDatabaseStores;
    _defaultStores: ETTDefalultStorage;

    constructor()
    {
        console.log("ETTDataProcessingManager init");
        this._dataBaseStores = new  ETTDatabaseStores();
        this._defaultStores  = new  ETTDefalultStorage();
    }
    sava()
    {
        console.log("savaData:");
}
    /*
      key:保存的key值
      object：保存的value
      expires：有效时间，
    */
    savaData(key,object,expires){

        if (this._defaultStores) {
            this._defaultStores.savaData(key,object,expires);
        }
    }

    saveData(key,object){
        console.log("savaData:"+ key+","+object);
        if (this._defaultStores) {
            this._defaultStores.savaData(key,object);
        }
    }
    saveItem(key,object)
    {
        console.log("savaItem:"+ key+","+object);
        this._defaultStores.saveItem(key,object)
    }

    /*
      删除单个数据
    */
    removeData(key){
       this._defaultStores.removeData(key);
    }

    /*
      移除所有"key-id"数据（但会保留只有key的数据）
    */
    removeAll(){
       this._defaultStores.removeAll();
    }

    /*
      清除某个key下的所有数据
     */
    clearDataByKey(key){
      this._defaultStores.clearDataByKey(key);
    }
    /*
       获取数据
    */
    loadData(key,params,someFlag,callBack){
        if (this._defaultStores)
        {
            this._defaultStores.loadData(key,params,someFlag,callBack);
        }
    }

    loadData(key,callBack)
    {
        if (this._defaultStores)
        {
            this._defaultStores.loadData(key,null,null,callBack);
        }
    }
    // loadData(key)
    // {
    //     console.log(key);
    //     if (this._defaultStores)
    //     {
    //       return  this._defaultStores.loadDataForkey(key);
    //     }
    //     return  {'data':ret,'code':-1,'msg':'objectisNull'};
    // }
    //获取本地存储单项数据
    loadItemForkey(key,callback)
    {
        if (this._defaultStores)
        {
            this._defaultStores.loadItemForkey(key,callback);
        }
    }
    createTable(tablename,sql,callback)
    {
        if(this._dataBaseStores)
        {
            this._dataBaseStores.createTable(tablename,sql,callback);
        }
    }

    dropTable(tablename,callback)
    {
        if(this._dataBaseStores)
        {
            this._dataBaseStores.dropTable(tablename,callback);
        }
    }

    insertDataToTable(sqlQuery,values,callback)
    {
        if(this._dataBaseStores)
        {
            this._dataBaseStores.insertData(sqlQuery,values,callback);
        }
    }

    selectData(sqlQuery,values,callback)
    {
        if(this._dataBaseStores)
        {
            this._dataBaseStores.selectData(sqlQuery,values,callback);
        }
    }

    deleteData(sql,value,callback)
    {
        if(this._dataBaseStores)
        {
            this._dataBaseStores.deleteData(sql,value,callback);
        }
    }
}
