import {APIErrorResultType, ErrorType} from "../types/blog-types";

export const errorResponse = (errorsArray:ErrorType[]):APIErrorResultType => {
let error_:APIErrorResultType = {
    errorsMessages : []
}
errorsArray.forEach((error:ErrorType)=>{
error_.errorsMessages.push(error)
})
return error_;
}
