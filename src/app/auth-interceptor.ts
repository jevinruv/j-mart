import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SessionStorageService } from "./services/session-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        let authReq = req;
        const token = this.sessionService.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq);
    }
}

export const httpAuthInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];