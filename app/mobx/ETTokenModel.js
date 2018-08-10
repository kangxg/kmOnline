import ETTBaseModel from   './ETTBaseModel';
export default class  ETTokenModel extends ETTBaseModel
{
    _access_token:String = '';
    _expiresIn   = '';
    _refresh_token:String = '';
    _expiration    = '';
}