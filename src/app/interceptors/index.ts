import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './header.interceptor';
import { ErrorHanInterceptor } from './error-han.interceptor';

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHanInterceptor, multi: true },
];
