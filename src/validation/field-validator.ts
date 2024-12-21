export const nameValidator = (name: string, errorsArray: Array<{ field: string, message: string }>) => {
    if (!name) {
        errorsArray.push({field: 'name', message: 'add name'})
    }
    if (name && name.trim().length < 1) {
        errorsArray.push({field: 'name', message: 'add name '})
    }
    if (name && name.trim().length > 15) {
        errorsArray.push({field: 'name', message: 'name cannot be more than 15 symbols'})
    }
}

export const descriptionValidator = (description: string, errorsArray: Array<{ field: string, message: string }>) => {

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

export const websiteURLValidator = (websiteUrl: string, errorsArray: Array<{ field: string, message: string }>) => {
    const RegExpDate = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');

    if (!websiteUrl || typeof websiteUrl !== 'string' || !RegExpDate.test(websiteUrl)) {
        errorsArray.push({field: 'websiteUrl', message: 'add websiteUrl'})
    }
    if (websiteUrl && websiteUrl.trim().length < 1) {
        errorsArray.push({field: 'websiteUrl', message: 'add websiteUrl '})
    }
    if (websiteUrl && websiteUrl.trim().length > 100) {
        errorsArray.push({field: 'websiteUrl', message: 'websiteUrl cannot be more than 500 symbols'})
    }

}

export const titleValidator = (title: string | undefined,
                               errorsArray: Array<{ field: string, message: string }>) => {
    if (!title) {
        errorsArray.push({field: 'title', message: 'no title'});
    }
    if (title && title.trim().length > 30) {
        errorsArray.push({
            field: 'title',
            message: 'more than 40 symbols'
        });
    }
    if (title && title.trim().length < 1) {
        errorsArray.push({
            field: 'title',
            message: 'add title'
        });
    }
}

export const shortDescriptionValidator = (description: string, errorsArray: Array<{ field: string, message: string }>) => {
    if (!description) {
        errorsArray.push({field: 'description', message: 'add description'});
    }
    if (description && description.trim().length < 1) {
        errorsArray.push({field: 'description', message: 'add description '})
    }
    if (description && description.trim().length > 100) {
        errorsArray.push({field: 'description', message: 'description cannot be more than 100 symbols'})
    }
}

export const contentValidator = (content: string, errorsArray: Array<{ field: string, message: string }>) => {
    if (!content) {
        errorsArray.push({field: 'content', message: 'add content'});
    }
    if (content && content.trim().length < 1) {
        errorsArray.push({field: 'content', message: 'add content '})
    }
    if (content && content.trim().length > 1000) {
        errorsArray.push({field: 'content', message: 'max legnth content cannot be more than 1000 symbols'});
    }
}

export const blogIdValidator = (blogId: string, errorsArray: Array<{ field: string, message: string }>) => {
    if (!blogId) {
        errorsArray.push({field: 'blogId', message: 'add BlogId'})
    }
}
