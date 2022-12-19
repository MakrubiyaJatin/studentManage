export default async function api(url,configObj){
    const originObj={
      headers: {
        'Content-Type':'application/json'
      }
    };
    const response = await fetch(url,Object.assign(originObj,configObj))
    return {...await response.json(), statusCode: response.status};
 }