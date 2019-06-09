import { UnauthorizedError } from './../components/shared/error-handling/unauthorized.error';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { NotFoundError } from '../components/shared/error-handling/not-found.error';
import { BadRequestError } from '../components/shared/error-handling/bad-request.error';
import { AppError } from '../components/shared/error-handling/app.error';

export class ErrorProvider {
    handleError(errorResponse: HttpErrorResponse) {
        switch (errorResponse.status) {
            case 400: return throwError(new BadRequestError(errorResponse));
            case 401: return throwError(new UnauthorizedError(errorResponse));
            case 404: return throwError(new NotFoundError(errorResponse));
            default: return throwError(new AppError(errorResponse));
        }
    }
}
