

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import {ettsync} from  './sync';
import {defaultExpires} from "../res/values/ETTConfig"
export  default  class  ETTDatabaseStores
{

    _storage:Storage;
    constructor()
    {
        console.log("ETTDatabaseStores init");
        this._storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,
            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,
            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: defaultExpires,
            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,
            // 如果storage中没有相应数据，或数据已过期，
            // 则会调用相应的sync方法，无缝返回最新数据。
            // sync方法的具体说明会在后文提到
            // 你可以在构造函数这里就写好sync的方法
            // 或是写到另一个文件里，这里require引入
            //sync:ettsync,
            sync:{

            }
        });
    }

    /*
     key:保存的key值
     object：保存的value
     expires：有效时间，
    */
    savaData(key,object,expires){
       if (this._storage)
       {
           this._storage.save(
               {
                   // 注意:请不要在key中使用_下划线符号!
                   key:key,
                   data:object,
                   // 如果不指定过期时间，则会使用defaultExpires参数
                   // 如果设为null，则永不过期
                   expires:expires
               }
           ).then(ret => {
               console.log("setItem");
               return ret;
           }).catch(err => {
               //如果没有找到数据且没有sync方法，
               //或者有其他异常，则在catch中返回
               console.warn("load error ="+ err.message);

           });
       }
    }
   saveItem(key,object){

        if (this._storage)
        {
            this._storage.setItem(key,object);
        }
       //this.savaData(key,object, defaultExpires);
   }
    saveData(key,object){


        this.savaData(key,object, defaultExpires);
    }

    /*
      删除单个数据
    */
    removeData(key){
       if (this._storage)
       {
           this._storage.remove({
               key: key,
           });
       }
    }

    /*
      移除所有"key-id"数据（但会保留只有key的数据）
    */
    removeAll(){
        if (this._storage)
        {
            this._storage.clearMap();
        }
    }

    /*
      清除某个key下的所有数据
     */
    clearDataByKey(key){
       if (this._storage)
       {
           this._storage.clearMapForKey(key);
       }
    }

    loadData(key,params,someFlag, callback =(data)=>{}){
        console.log("begain load");

        if (this._storage)
        {
            this._storage.load({
                key: key,
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
                autoSync: false,
                // syncInBackground(默认为true)意味着如果数据过期，
                // 在调用sync方法的同时先返回已经过期的数据。
                // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: true,

                // 你还可以给sync方法传递额外的参数
                syncParams:{ params,
                    someFlag: someFlag,
                },
            }).then(ret => {
                console.log("result load");
                let result = {"data":ret,code:1};
                callback(result);
            }).catch(err => {
                //如果没有找到数据且没有sync方法，
                //或者有其他异常，则在catch中返回
                //console.warn("load error ="+ err.message);
                let result = {'code':-1,'msg':err.name};
                callback(result);
            });
        }
    }

    loadDataForkey(key) {

        this._storage.getItem(key).then(ret => {
            console.log("result load");
            let result = {"data":ret,code:1};
            return result;
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn("load error ="+ err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }

            let result = {'code':-1,'msg':err.name};

            return result;
        });
        console.log("begain load");

    }

    loadItemForkey(key,callback)
    {
        this._storage.getItem(key).then(ret => {
            console.log("result load");
            let result = {"data":ret,code:1};
            callback(result);
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn("load error ="+ err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }

            let result = {'code':-1,'msg':err.name};

            callback(result);
        });
        console.log("begain load");

    }


}