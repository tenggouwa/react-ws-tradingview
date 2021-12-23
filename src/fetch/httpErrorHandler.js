// import message from '@/components/message'
export default (error) => {
    if (!error.response) {
        // return Promise.reject(error.response)
    }
    const msg = error
    // const status = error.response.status
    switch (error.response.status) {
    case 400:
        msg.message = `${error.response.status}:${window.t('errors.400')}`
        break
    case 401:
        msg.message = `${error.response.status}:${window.t('errors.400')}`
        break
    case 403:
        msg.message = `${error.response.status}:${window.t('errors.400')}`
        break
    case 404:
        msg.message = `${error.response.status}:${window.t('errors.400')}`
        break
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
        msg.message = `${error.response.status}:${window.t('errors.400')}`
        break
    default:
        msg.message = `${error.response.status}:${window.t('errors.400')}`
    }
    return Promise.reject(msg)
}
