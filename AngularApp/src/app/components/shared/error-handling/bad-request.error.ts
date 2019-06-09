import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from './app.error';
export class BadRequestError extends AppError {
    constructor(errorResponse?: HttpErrorResponse) {
        super(errorResponse.error.errors || errorResponse.error);
    }
}
