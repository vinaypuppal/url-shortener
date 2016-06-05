### API Base Jump: Url Shortener Microservice (Freecodecamp Project)
---

#### User stories:

* I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

* If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

* When I visit that shortened URL, it will redirect me to my original link.

##### Example Usage:

http://vp-shorturl.com/new/http://www.google.com


##### Example Output:

```javascript
	{
	original_url: "http://www.google.com/",
	short_url: "http://vp-shorturl.com/1"
	}
	
```
---

##### UI:

![url-shortener-microservice-ui](https://res.cloudinary.com/vinaypuppal/image/upload/c_scale,w_1024/v1465124936/fcc/ui-url-shortener.png)

#### How To Run This App Locally

Clone This Repoistory:
```bash
git clone https://github.com/vinaypuppal/url-shortener
```

```bash
cd <cloned directory>
```

Start MongoDB Server: ( Follow this [wiki](https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/Using-MongoDB-And-Deploying-To-Heroku) for help )
```bash
mongod --port 27017 --dbpath=./data
```

Install dependencies and start server:
```bash
npm install
npm run dev
```
---