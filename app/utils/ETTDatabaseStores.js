
import React from "react-native";
import SQLiteStorage from 'react-native-sqlite-storage';
// SQLiteStorage.DEBUG(false);
// SQLiteStorage.enablePromise(true);

export  default  class  ETTDatabaseStores
{
     _db:SQLiteStorage;
    constructor()
    {

        console.log("ETTDatabaseStore init");
         this.openDatabase();
    }
    openDatabase()
    {
        if(this._db == null)
        {
            this._db = SQLiteStorage.openDatabase(
                'learningStore.db',
                '1.0',
                'MySQLite',
                -1,
                ()=>{
                  this.dbSuccess('DB Open');
                },
                (err)=>{
                  this.dbError("SQL Error:",err)
                }
            );
        }
    }

    createTable(tableName,sqlQuery,callback){
        if (this._db == null) {
            this.openDatabase();
        }

        //创建用户表

        this._db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+ tableName +'(' +
                sqlQuery+
                ')'
                , [], ()=> {
                    this.dbSuccess('executeSql');
                    callback(true);
                }, (err)=> {
                    this.dbError('executeSql', err);
                    callback(false);
                });
        }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this.dbError('transaction', err);
        }, ()=> {
            this.dbSuccess('transaction');
        });
    }
    closeDatabase(callback)
    {
        if (this._db)
        {
            this._db.close();
            this.dbSuccess("DB Close");
            callback(true);
        }
        else
        {
            console.log("SQLiteStorage not open");
            callback(false);
        }
    }

    insertData(sqlQuery,values,callback){
        if (!this._db) {
            this.openDatabase();
        }
        this._db.transaction((tx)=>{

               let sql = "INSERT INTO "+sqlQuery;
               tx.executeSql(sql,values,()=>{
                  this.dbSuccess("insert data sucess");
                  callback(true);
                },(err)=>{
                    this.dbError("insert data faile",err);
                   callback(false);
                }
            );

        },(error)=>{
            this._errorCB('insert data', error);
        },()=>{
            this.dbSuccess('insert data Success:' );
        });
    }

    deleteData(sql,value,callback){
        if (!this._db) {
            this.openDatabase();
        }
        this._db.transaction((tx)=>{
            tx.executeSql(sql,value,()=>{
                this.dbSuccess("delete data success");
                callback(true);
            },(error)=>{
                this.dbError('delete data error', error);
                callback(false);
            });
        });
    }
    dropTable(table,callback){
        this._db.transaction((tx)=>{
            tx.executeSql('drop table '+table,[],()=>{
                this.dbSuccess('transaction drop  table success');
                callback(true);
            });
        },(err)=>{
            this.dbError('transaction drop table', err);
            callback(false);
        });
    }

    selectData(sqlQuery,values,callback)
    {
        if (!this._db) {
            this.openDatabase();
        }

        this._db.transaction((tx)=>{
            tx.executeSql(
                sqlQuery,
                values,
                (tx,results)=>{
                    this.dbSuccess("selectData completed :"+results);
                    var len = results.rows.length;
                    let arr= new Array();
                    for (let i = 0;i<len;i++)
                    {
                        var u = results.rows.item(i);

                        console.log(u.name+','+u.age);
                        arr.push(u);
                    }
                    callback(arr);//这里回调就报错了

                }
            );
        },(error)=>{
            this.dbError("select error:",error);

        });
    }
    dbSuccess(name){
        console.log("SQLiteStorage : "+name+" success");
    }
    dbError(name, err){
        console.log("SQLiteStorage  error:"+name);
        console.log(err);
    }

    render(){
        return null;
    }

}