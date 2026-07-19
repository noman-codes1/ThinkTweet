//#tip: Build the understanding of class and constructor again

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message)

        this.statusCode = statusCode,
        this.message = message
    }
}

export class ValidationError extends AppError {
    constructor (message) {
        super(message, 422)
    }
}

export class NotFoundError extends AppError {
    constructor (message) {
        super(message, 404)
    }
}

export class BadRequestError extends AppError{
    constructor(message) {
        super(message, 400)
    }
}

export class UnauthorizedError extends AppError {
    constructor (message) {
        super(message, 401)
    }
}

export class ForbiddenError extends AppError {
    constructor (message) {
        super(message, 403)
    }
}

export class ConflictError extends AppError {
    constructor(message) {
        super(message, 409)
    }
}

export class AIServiceError extends AppError {
    constructor(message) {
        super(message, 502)
    }
}

export class InteralServerError extends AppError {
    constructor(message) {
        super(message, 500)
    }
}

export class TokenExpiredError extends AppError {
    constructor(message) {
        super(message, 5252)
    }
}