require("../util/httpRequester");
require ("../constants/config")
let url = "http://23.98.131.148:8080/api/device";
let urlToken = "http://23.98.131.148:8080/api/auth/login";
let urlDispositivo = "http://23.98.131.148:8080/api/device/";

global.agregarDispositivo = async (data) => {
    let datosJSON = `
    {
    "name": "${data}",
    "type": "elm327",
    "label": null,
    "additionalInfo": {
        "gateway": false,
        "description": ""
    }
}
`;
    let token = await obtenerTokenThings()
    token = JSON.parse(token).token
    console.log(token)

    let dispositivo =  await HttpRequester.makePOST(url, {
        headers: {"content-type": "application/json","X-Authorization":"Bearer "+token},
        body: datosJSON
    })
    console.log(dispositivo)

    let idDispositivo = JSON.parse(dispositivo).id.id

    console.log(idDispositivo)

    let accessToken = await HttpRequester.makeGET(urlDispositivo+dispositivo+"/credentials")
    console.log(accessToken)

};

function obtenerTokenThings(){
    let datos =`{"username":"${CONFIG.THINGSUSER}", "password":"${CONFIG.THINGSPASSWORD}"}`
    console.log(datos)
    return HttpRequester.makePOST(urlToken,{body:datos})
}
function obtenerAccessToken(dispositivo){
    return HttpRequester.makeGET(urlDispositivo+dispositivo+"/credentials")
}

