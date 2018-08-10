
import  ETTUserModel  from  '../mobx/ETTUserModel';
import  ETTAppInfoModel  from  '../mobx/ETTAppInfoModel';
import  ETTDataProcessingManager  from './ETTDataProcessingManager';
import  ETTString   from  '../res/values/ETTString'
import {ETTAppLoadState, ETTTokenStatus, ETTUserLogType} from '../res/values/ETTEnum'
import  ETTTokenManager from './ETTTokenManager';
import {DataManager} from "../res/values/ETTConfig";
import {observable,computed,autorun,action,useStrict} from 'mobx';
let  instance = null;
export  class  ETTDataHouseManager
{
     _userModel:ETTUserModel;
     _appInfo:ETTAppInfoModel;
     _dataProcessing:ETTDataProcessingManager;
     _tokenManager:ETTTokenManager ;
    constructor()
    {

        this._dataProcessing = new ETTDataProcessingManager();
        this._userModel =  new ETTUserModel();
        this._appInfo   =  new ETTAppInfoModel();
        this._tokenManager  = new ETTTokenManager();
        this._tokenManager.storageUserModel(this._userModel);
        console.log("ETTDataHouseManager init");
        this.accessCacheData();
    }

    //读取本地缓存
    accessCacheData()
    {
        // this._dataProcessing.loadItemForkey(ETTString.welcomeGuide,(result)=>{
        //     console.log(result);
        //     if (result.code == 1)
        //     {
        //         this._appInfo.setFirstOpenStatus(result.data);
        //     }
        //
        //     this._appInfo._isLoadState = this._appInfo._isLoadState | ETTAppLoadState.loadWelcome;
        //
        // });

        this._dataProcessing.loadData(ETTString.appInfo,(result)=>{
            if (result.code == 1)
            {
                let data = result.data;
                this._appInfo.setLoadDataComplet(data);
            }
            else {
                this._appInfo.resetModel();
            }

            this._appInfo._isLoadState = this._appInfo._isLoadState | ETTAppLoadState.loadWelcome;

        });

        this._dataProcessing.loadData(ETTString.userInfo,(result)=>{
            if (result.code == 1)
            {
                let data = result.data;
                this._userModel.setLoadDataComplet(data);
                if (DataManager._tokenManager.checkTokenEffective() == ETTTokenStatus.tokenInvalid)
                {
                    this.logOut();
                }
            }
            else {
                this._userModel.resetUserInfo();
            }

            this._appInfo._isLoadState = this._appInfo._isLoadState | ETTAppLoadState.loadUserInfo;

        });

    }

    /***
     * 类方法
     */
    static ShareInstance(){
        if (instance == null)
        {
            instance = new ETTDataHouseManager();
            console.log("ETTDataHouseManager share");

        }
        return instance;
    }

    setUseModel(model:ETTUserModel)
    {
        console.log("setModel");
        if(model)
        {
            this._userModel.setName(model.name,(key)=>{

                this._dataProcessing.saveData("name",key);
                this._dataProcessing.loadData("name",this.didloadData);
            });
            console.log("usermodel = "+this._userModel.getName());
            this.testData();
        }
    }
    //引导页完成后调用
     @action  welcomeGuideComple()
    {

        if (this._appInfo)
        {
            this._appInfo._isFirstOpen  = 'NO';

            if (this._dataProcessing)
            {
                this._dataProcessing.saveData(ETTString.appInfo,this._appInfo);
            }
        }

    }
    //注册成功后调用
    regSuccessful(json)
    {
       if(this._userModel)
       {
           this._userModel.setRegSuccessfulInfo(json);
       }
    }
    //个人资料更改昵称成功后调用
    editUserNickNameSuccessful(name)
    {
        if (this._userModel && name.length>0)
        {
            this._userModel._userName = name;
            this.savaUserInfo();
        }
    }
    //个人中心获取用户信息成功后调用
    obtainUserInfoSuccessful(data)
    {

        if (data && this._userModel)
        {
            this._userModel.setUserInfo(data);
            this.savaUserInfo();
        }
    }
    @action bindMobiePhoneSuccessful(json,type,amountInfo)
    {
        this._userModel._phone = amountInfo.phone;
        this.logSuccessful(json,type,amountInfo);

    }
    //登录成功调用
    logSuccessful(json,type,amountInfo)
    {
        if(this._userModel)
        {
            this._userModel.setLogSuccessfulInfo(json,type,amountInfo);
            this._userModel._isLog = true;
            this.savaUserInfo();
        }

    }
    thirdAmountLogSuccessful(json,type,amountInfo)
    {
        if(this._userModel)
        {
            this._userModel.setLogSuccessfulInfo(json,type,amountInfo);

            this.savaUserInfo();
        }

    }
    removeThirdAmountSuccessful(type)
    {
        if(this._userModel)
        {
            this._userModel.removeThirdAmount(type);
            this.savaUserInfo();
        }

    }
    //更改密码成功后调用
    changePassword(newPwd)
    {
        if(this._userModel)
        {
            this._userModel.setNewPassword(newPwd);

            this.savaUserInfo();
        }
    }
    //刷新用户token成功后调用
    refreshTokenFresh(data)
    {
        if(this._userModel)
        {
            this._userModel.refreshtokenSuccessfulInfo(data);

            this.savaUserInfo();
        }
    }
    //刷新面登录token成功后调用
    refreshAvoidloginToken(data)
    {
        if (this._appInfo)
        {
            this._appInfo.refreshtokenSuccessfulInfo(data);
            this.savaAppinfo();
        }
    }
    //保存用户信息本地缓存
    savaUserInfo()
    {
        if (this._dataProcessing)
        {
            this._dataProcessing.saveData(ETTString.userInfo,this._userModel);
        }
    }
    //保存应用信息到缓存
    savaAppinfo()
    {
        if (this._dataProcessing)
        {
            this._dataProcessing.saveData(ETTString.appInfo,this._appInfo);
        }
    }
    testCreateTable()
    {
        var sql =   'name varchar, age VARCHAR,sex VARCHAR,phone VARCHAR,email VARCHAR,address VARCHAR';

        this._dataProcessing.createTable('User',sql,(result)=>{
            console.log("testCreateTable "+result);
        });
    }

    testSelectName()
    {
        let  sql =  "select * from User where name =?";

        this._dataProcessing.selectData(sql,["kangxg"],(result)=>{

            for(let i = 0 ;i< result.length;i++)
            {
                var u = result[i];
                console.log("testSelectName:"+u.name+','+u.age);
            }
        });
    }

    testInsetDatawithName()
    {
        let sql = "User(name,age,sex,phone,email,address)"+
            "values(?,?,?,?,?,?)";
        this._dataProcessing.insertDataToTable(sql,['kangxg',20,'man',1322222222,'test@163.com','beijing'],(result)=>{
            console.log("testInsetDatawithName "+result);
        });

    }

    testDropTable()
    {
       this._dataProcessing.dropTable('User',(result)=>{
           console.log("testDropTable "+result);
       });
    }
    testSelectAll()
    {
        let  sql =  "select * from User ";
        this._dataProcessing.selectData(sql,[],(result)=>{
            for(let i = 0 ;i< result.length;i++)
            {
                var u = result[i];
                console.log("testSelecAll:"+u.name+','+u.age);
            }

        });
    }
    testDeleteData()
    {
        let sql ="delete from User";
        this._dataProcessing.deleteData(sql,[],(result)=>{
            console.log("testDeleteData "+result);
        });
    }
    testData()
    {
        this.testCreateTable();
        //this.testDropTable();
        this.testInsetDatawithName();
        this.testSelectAll();
        this.testSelectName();
        this.testDeleteData();

    }
    userDataDidUpdate()
    {
        console.log("userModelDidUpdate");
    }

    userDataForKeyDidUpdate(key)
    {
        console.log("userModelDidUpdate:"+key);
        let pro = this._dataProcessing;
        pro.saveData("name",key);

        pro.loadData("name",this.didloadData);
        //let manager = ETTDataHouseManager.ShareInstance();

        // manager._dataProcessing.saveData("name",manager._userModel.getName());
        //
        // manager._dataProcessing.loadData("name",manager.didloadData);
    }
    didloadData(data)
    {
        console.log("load = "+data);
    }
    getkeysuccess(ret)
    {

    }
    //退出登录调用
    logOut()
    {
        if (this._dataProcessing)
        {
            this._dataProcessing.removeData(ETTString.userInfo);
        }
        if(this._userModel)
        {

            this._userModel._isLog = false;
            this._userModel.resetUserInfo();
        }
    }

}
