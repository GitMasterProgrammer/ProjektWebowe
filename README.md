# ProjektWebowe

Pioter czytajj!!!!!!!!!!!!!.

## POST 

Sample post query.

```bash
URL: localhost:3000/api/post/user

JSON: {
 "email": "newuser123@example.com",
 "name": "New User123",
 "password": "securepassword123"
}
```

## GET

Sample get query.
> Extra feature: limitless where query

```bash
URL: localhost:3000/api/get/user

JSON: {
"email":"newuser123@example.com",
"name": "New user6969"
}

#Now it should choose users with email -> "newuser123@example.com" and name -> "New user6969"
```
