# abv.URL

The architectur is as follows:

- Backend:
  - Express
  - 3 routes:
    - \getURLS (GET request)
    - \shorten (POST request)
    - \:shortUrl (GET request)
- Frontend (client):
  - React
  - React-Bootsrop
  - fetch proxy to backend
