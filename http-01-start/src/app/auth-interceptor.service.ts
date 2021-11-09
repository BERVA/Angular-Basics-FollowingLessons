import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
export class AuthInterceptorService implements HttpInterceptor{
  // Interceptor kodu istek uygulamadan ayrılmadan ve cevap geldiğinde subscribe'a göndermeden önce çalıştırıyor.
  // 'next' isteğin yoluna devam etmesi için var.
  // Şu anki haliyle her istekte gerçekleşecek. Fonksiyonun içinde örneğin url bilgisi kontrol edilerek kısıtlanabilir.
  // Interceptor'ün içinde istek nesnesini clone üstünden modifiye edebiliriz.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
    const modifiedReq = req.clone({headers: req.headers.append('Auth', 'xyz')})
    // return next.handle(req)
    return  next.handle(modifiedReq);
  }
}
