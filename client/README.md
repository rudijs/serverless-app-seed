## Test Setup

Create the file `cypress.env.json` beside `cypress.json` (this file will be
ignored by Git and not committed).

Update the username and password credentials

```
{
  "adminEmail": "admin@example.com",
  "adminPassword": "",
  "userEmail": "user@example.com",
  "userPassword": ""
}
```

## Test

- local
- `npm run cypress:open`
- staging
- `STAGE=dev npm run cypress:open`
- prod
- `STAGE=prod npm run cypress:open`
