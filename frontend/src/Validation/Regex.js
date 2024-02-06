const testEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    // const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPattern.test(value)
}

export default {testEmail} 