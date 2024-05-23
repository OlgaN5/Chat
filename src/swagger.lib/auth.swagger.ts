export const userSignUp = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            description: 'email',
            default: 'email123@gmail.com'
        },
        login: {
            type: 'string',
            description: 'login',
            default: 'login123'
        },
        password: {
            type: 'string',
            description: 'password',
            default: 'Password@123'
        },
        confirmPassword: {
            type: 'string',
            description: 'confirm password',
            default: 'Password@123'
        }
    },
    required: ['email', 'login', 'password', 'confirmPassword']
}

export const userSignIn = {
    type: 'object',
    properties: {
        login: {
            type: 'string',
            description: 'login',
            default: 'login123'
        },
        password: {
            type: 'string',
            description: 'password',
            default: 'Password@123'
        },

    },
    required: ['login', 'password']
}