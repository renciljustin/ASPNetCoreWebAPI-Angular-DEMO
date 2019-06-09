import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
export class AppError {
    constructor(errorResponse?: HttpErrorResponse) {
        console.log(errorResponse.error || errorResponse);
        return throwError(errorResponse.error || errorResponse);
    }
}
