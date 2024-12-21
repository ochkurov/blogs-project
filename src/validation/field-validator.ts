export const nameValidator = (name: string, errorsArray: Array<{ field: string, message: string }>) => {
        if (!name) {
        errorsArray.push({field: 'name', message: 'add name'})
        if (name && name.trim().length < 1) {
            errorsArray.push({field: 'name', message: 'add name '})
        }
        if (name && name.trim().length > 15) {
           errorsArray.push({field: 'name', message: 'name cannot be more than 15 symbols '})
        }
    }
}
export const descriptionValidator = (description: string , errorsArray: Array<{ field: string, message: string }>) => {

    if (!description) {
        errorsArray.push({field: 'description', message: 'add description'})
    }
    if (description && description.trim().length < 1) {
        errorsArray.push({field: 'description', message: 'add description '})
    }
    if (description && description.trim().length > 500) {
        errorsArray.push({field: 'description', message: 'name cannot be more than 500 symbols'})
    }
}
export const websiteURLValidator = (websiteUrl: string , errorsArray: Array<{ field: string, message: string }>) => {

    if (!websiteUrl) {
        errorsArray.push({field: 'websiteUrl', message: 'add websiteUrl'})
    }
    if (websiteUrl && websiteUrl.trim().length < 1) {
        errorsArray.push({field: 'websiteUrl', message: 'add websiteUrl '})
    }
    if (websiteUrl && websiteUrl.trim().length > 100) {
        errorsArray.push({field: 'websiteUrl', message: 'websiteUrl cannot be more than 500 symbols'})
    }
}
