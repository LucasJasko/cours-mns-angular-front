import { HttpInterceptorFn } from '@angular/common/http';

// On créé ici un intercepteur qui vient se placer avant les échanges entre le front et le back, il est ensuite apposé à l'objet HTTPclient qu'on invoque dans nos composants, cette injection se fait dans app.config.ts
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const cloneRequest = req.clone({ setHeaders: { Authorization: token } });

    return next(cloneRequest);
  }

  return next(req);
};
