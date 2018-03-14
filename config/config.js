module.exports = {
    host:process.env.HOST || '127.0.0.1',
    port:process.env.PORT ||(process.env.NODE_ENV === 'production'?8080:3000),
    apiHost:process.env.APIHOST || '127.0.0.1',
    apiPort:process.env.APIPORT || '3030',
    dbHost:"localhost",
    dbPort:"27017",
    app:{
        title:"shop",
        description:'',
        head:{
            titleTemplate:'Shop',
            meta:[
                {
                    name:"description",
                    content:"一个校内二手交易平台"
                },
                {charset:"utf-8"}
            ]
        }
    }
};