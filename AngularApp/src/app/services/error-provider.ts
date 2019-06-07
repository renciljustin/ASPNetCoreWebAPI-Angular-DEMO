import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { NotFoundError } from '../components/shared/error-handling/not-found.error';
import { BadRequestError } from '../components/shared/error-handling/bad-request.error';
import { AppError } from '../components/shared/error-handling/app.error';

export class ErrorProvider {
    handleError(error: HttpErrorResponse) {
        switch (error.status) {
            case 401: return throwError(new BadRequestError());
            case 404: return throwError(new NotFoundError());
            default: return throwError(new AppError());
        }
    }
}
