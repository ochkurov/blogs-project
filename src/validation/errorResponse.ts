import {APIErrorResultType, ErrorType} from "../types/blog-types";

export const errorResponse = (errorsArray:ErrorType[]):APIErrorResultType => {
let error_:APIErrorResultType = {
errorMessages : []
}
errorsArray.forEach((error:ErrorType)=>{
error_.errorMessages.push(error)
})
return error_;
}
