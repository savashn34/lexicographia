import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('Authorization');
    const { pathname } = request.nextUrl;

    const protectedRoutes = [
        '/profile',
        '/:db/edit',
        '/:db/:word/edit',
        '/:db/edit/add-word',
        '/dictionary/add',
        '/dictionary'
    ];

    const isProtectedRoute = protectedRoutes.some(route => {
        const regex = new RegExp(`^${route.replace(/:[^\s/]+/g, '([\\w-]+)')}$`);
        return regex.test(pathname);
    });

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (token) {
        if (pathname === '/login') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        const requestHeaders = new Headers(request.headers);

        requestHeaders.set('Authorization', `Bearer ${token.value}`);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}