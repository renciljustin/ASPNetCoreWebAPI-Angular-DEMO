import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { throwError } from 'rxjs';

export class AppErrorHandler implements ErrorHandler {
    handleError(errorResponse: HttpErrorResponse): void {
        console.log(errorResponse.error || 'Unexpected error occurred.');
        throwError(errorResponse);
    }
}
