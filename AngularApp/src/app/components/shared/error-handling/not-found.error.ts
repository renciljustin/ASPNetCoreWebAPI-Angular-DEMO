import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from './app.error';
export class NotFoundError extends AppError {
    constructor(errorResponse?: HttpErrorResponse) {
        super(errorResponse.error);
    }
}
